const express = require("express");
const {
  Exercise,
  Session,
  Question,
  Answer,
  Assignment,
  User,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { checkRole } = require("../../utils/checkRole");

const router = express.Router();

//Get assignment by Id
router.get("/:assignmentId", requireAuth, async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { role, id: userId } = req.user;
    let assignment;

    if (role === "teacher") {
      assignment = await Assignment.findOne({
        where: { id: assignmentId, teacherId: userId },
        include: [
          { model: Exercise },
          {
            model: User,
            as: "student",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });
    } else if (role === "student") {
      assignment = await Assignment.findOne({
        where: { id: assignmentId, studentId: userId },
        include: [
          { model: Exercise },
          {
            model: User,
            as: "teacher",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden. Invalid role for this action." });
    }

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json(assignment);
  } catch (error) {
    console.error("Error in GET /assignments/:assignmentId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get assignments
router.get("/", requireAuth, async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    let assignments;

    if (role === "teacher") {
      // Fetch all assignments the teacher has assigned
      assignments = await Assignment.findAll({
        where: { teacherId: userId },
        include: [
          { model: Exercise },
          {
            model: User,
            as: "student",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });
    } else if (role === "student") {
      // Fetch all exercises assigned to the student
      assignments = await Assignment.findAll({
        where: { studentId: userId },
        include: [
          { model: Exercise },
          {
            model: User,
            as: "teacher",
            attributes: ["id", "firstName", "lastName", "email"],
          },
        ],
      });
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden. Invalid role for this action." });
    }

    res.status(200).json(assignments);
  } catch (error) {
    console.error("Error in GET /assignments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Delete Assignments
router.delete(
  "/:assignmentId",
  requireAuth,
  checkRole("teacher"),
  async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const { id: userId } = req.user;
      const assignment = await Assignment.findOne({
        where: { id: assignmentId, teacherId: userId },
      });

      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }

      await assignment.destroy();

      return res
        .status(200)
        .json({ message: "Assignment deleted successfully" });
    } catch (error) {
      console.error("Error in DELETE /assignments/:assignmentId:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
