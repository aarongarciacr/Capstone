const express = require("express");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Session, Exercise } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username is require."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is require."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is require."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  const userExist = await User.unscoped().findOne({
    where: {
      username,
    },
  });

  if (userExist) {
    return res.status(500).json({
      message: "User already exists",
      errors: {
        username: "User with that username already exists",
      },
    });
  }

  const emailExist = await User.unscoped().findOne({
    where: {
      email,
    },
  });

  if (emailExist) {
    return res.status(500).json({
      message: "User already exists",
      errors: {
        email: "User with that email already exists",
      },
    });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    hashedPassword,
    role,
  });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    role: user.role,
  };

  await setTokenCookie(res, safeUser);

  return res.status(201).json({
    user: safeUser,
  });
});

//Edit user
router.put("/:userId", requireAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { user } = req;

    if (user.id !== parseInt(userId)) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const { firstName, lastName, email, username } = req.body;

    const userToEdit = await User.findByPk(userId);

    if (!userToEdit) {
      return res.status(404).json({ message: "User not found" });
    }

    await userToEdit.update({
      firstName,
      lastName,
      email,
      username,
    });

    return res
      .status(200)
      .json({ message: "User updated successfully", userToEdit });
  } catch (error) {
    console.error("Error in PUT /users/userId:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get user stats
router.get("/:userId/stats", requireAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { user } = req;

    if (!user || user.id !== parseInt(userId, 10)) {
      res.status(404).json({ message: "User not found or unauthorized" });
    }

    const session = await Session.findAll({
      where: { userId },
      include: [
        {
          model: Exercise,
          attributes: ["name"],
        },
      ],
    });

    if (!session || session.length === 0) {
      return res.status(200).json({
        totalSessions: 0,
        accuracy: 0,
        mostPracticed: null,
      });
    }

    const totalSession = session.length;

    const totalAccuracy = session.reduce(
      (sum, session) => sum + session.accuracy,
      0
    );
    const averageAccuracy = totalAccuracy / totalSession;

    const exerciseFrequency = {};
    session.forEach((session) => {
      const exerciseName = session.Exercise.name;
      exerciseFrequency[exerciseName] =
        (exerciseFrequency[exerciseName] || 0) + 1;
    });

    const mostPracticed = Object.keys(exerciseFrequency).reduce((a, b) =>
      exerciseFrequency[a] > exerciseFrequency[b] ? a : b
    );

    return res.status(200).json({
      totalSession,
      accuracy: Math.round(averageAccuracy),
      mostPracticed,
    });
  } catch (error) {
    console.error("Error in GET /users/:userId/stats:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
