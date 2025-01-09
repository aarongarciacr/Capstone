const express = require("express");
const { Exercise, Session, Answer, Question } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

//submit answers
router.post("/:sessionId/answers", requireAuth, async (req, res) => {
  const { sessionId } = req.params;
  const { questionId, selectedAnswer } = req.body;
  const { user } = req;

  const session = await Session.findByPk(sessionId, {
    where: { userId: user.id },
  });
  if (!session) {
    return res
      .status(404)
      .json({ error: "Session not found or unauthorized." });
  }

  const question = await Question.findByPk(questionId);
  if (!question) {
    return res.status(404).json({ error: "Question not found." });
  }

  const isCorrect = question.correctAnswer === selectedAnswer;

  await Answer.create({
    sessionId,
    questionId,
    selectedAnswer,
    isCorrect,
  });

  res.status(201).json({ message: "Answer recorded successfully.", isCorrect });
});

//Get session by id
router.get("/:sessionId", requireAuth, async (req, res) => {
  const { user } = req;
  const { sessionId } = req.params;
  const session = await Session.findByPk(sessionId, {
    where: {
      userId: user.id,
    },
    include: [
      {
        model: Exercise,
      },
    ],
  });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  return res.status(200).json(session);
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
