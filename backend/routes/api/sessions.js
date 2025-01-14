const express = require("express");
const {
  Exercise,
  Session,
  Answer,
  Question,
  User,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { checkRole } = require("../../utils/checkRole");
const { now } = require("sequelize/lib/utils");

const router = express.Router();

//submit answers
router.post("/:sessionId/answers", requireAuth, async (req, res) => {
  const { sessionId } = req.params;
  const { answers } = req.body;
  const { user } = req;

  const session = await Session.findOne({
    where: { userId: user.id, id: sessionId },
  });
  if (!session) {
    return res
      .status(404)
      .json({ error: "Session not found or unauthorized." });
  }

  const results = [];
  let totalAnswers = 0;
  let totalCorrectAnswers = 0;

  for (const answer of answers) {
    const { questionId, selectedAnswer } = answer;

    const question = await Question.findByPk(questionId);
    if (!question) {
      results.push({ questionId, error: "Question not found." });
      continue;
    }

    const isCorrect = question.correctAnswer === selectedAnswer;

    const newAnswer = await Answer.create({
      sessionId,
      questionId,
      selectedAnswer,
      isCorrect,
    });
    totalAnswers += 1;
    if (newAnswer.isCorrect === true) {
      totalCorrectAnswers += 1;
    }
    results.push({
      questionId,
      isCorrect,
      message: "Answer recorded successfully.",
    });
  }

  session.accuracy = (totalCorrectAnswers / totalAnswers) * 100;
  session.endTime = new Date();
  await session.save();

  res.status(201).json({ message: "Answers recorded successfully.", results });
});

// Get session by id
router.get("/:sessionId", requireAuth, async (req, res) => {
  const { user } = req;
  const { sessionId } = req.params;

  try {
    const session = await Session.findOne({
      where: { id: sessionId },
      include: [
        {
          model: Exercise,
        },
        {
          model: Answer,
        },
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "role"],
        },
      ],
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (
      session.userId !== user.id &&
      !(user.role === "teacher" && session.User.role === "student")
    ) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    return res.status(200).json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get all user Sessions
router.get("/", requireAuth, async (req, res) => {
  const { user } = req;

  try {
    const sessions = await Session.findAll({
      where: { userId: user.id },
      include: [{ model: Exercise }],
    });

    return res.status(200).json({ sessions });
  } catch (error) {
    console.error("Error fetching sessions", error);
    return res.status(500).json({ message: "Failed to fetch sessions" });
  }
});

module.exports = router;
