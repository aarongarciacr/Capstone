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

//get exercise progress
router.get("/:exerciseId/progress", requireAuth, async (req, res) => {
  const { exerciseId } = req.params;
  const { user } = req;

  const progress = await Session.findAll({
    where: { userId: user.id, exerciseId },
    include: [Answer],
  });

  res.status(200).json(progress);
});

//delete question
router.delete(
  "/:exerciseId/questions/:questionId",
  requireAuth,
  checkRole("teacher"),
  async (req, res) => {
    try {
      const { exerciseId, questionId } = req.params;

      const exercise = await Exercise.findByPk(exerciseId);
      if (!exercise) {
        return res.status(404).json({ message: "Exercised not found" });
      }

      const question = await Question.findOne({
        where: { id: questionId, exerciseId: exercise.id },
      });
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      await question.destroy();

      return res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      console.error(
        "Error in DELETE /exercises/:exerciseId/questions/:questionId:",
        error
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//Edit question
router.put(
  "/:exerciseId/questions/:questionId",
  requireAuth,
  checkRole("teacher"),
  async (req, res) => {
    try {
      const { exerciseId, questionId } = req.params;

      const exercise = await Exercise.findByPk(exerciseId);
      if (!exercise) {
        return res.status(404).json({ message: "Exercised not found" });
      }

      const question = await Question.findOne({
        where: { id: questionId, exerciseId: exercise.id },
      });
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      const {
        questionText,
        rootNote,
        interval,
        chordNotes,
        melody,
        correctAnswer,
        options,
      } = req.body;

      await question.update({
        questionText,
        rootNote,
        interval,
        chordNotes,
        melody,
        correctAnswer,
        options,
      });

      return res
        .status(200)
        .json({ message: "Question updated successfully", question });
    } catch (error) {
      console.error(
        "Error in PUT /exercises/:exerciseId/questions/:questionId:",
        error
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//Get question by id
router.get(
  "/:exerciseId/questions/:questionId",
  requireAuth,
  checkRole("teacher"),
  async (req, res) => {
    try {
      const { exerciseId, questionId } = req.params;

      const exercise = await Exercise.findByPk(exerciseId);
      if (!exercise) {
        return res.status(404).json({ message: "Exercised not found" });
      }

      const question = await Question.findOne({
        where: { id: questionId, exerciseId: exercise.id },
      });
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      return res.status(200).json(question);
    } catch (error) {
      console.error(
        "Error in GET /exercises/:exerciseId/questions/:questionId:",
        error
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//Start an exercise
router.post("/:exerciseId/start", requireAuth, async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const { user } = req;

    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    const newSession = await Session.create({
      userId: user.id,
      exerciseId: exercise.id,
      startTime: new Date(),
    });

    return res.status(200).json({
      sessionId: newSession.id,
      exerciseId: newSession.exerciseId,
      name: exercise.name,
      difficulty: exercise.difficulty,
      startTime: newSession.startTime,
    });
  } catch (error) {
    console.error("Error in POST /exercises/:exerciseId/start:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Add questions to an exercise
router.post(
  "/:exerciseId/questions",
  requireAuth,
  checkRole("teacher"),
  async (req, res) => {
    try {
      const { exerciseId } = req.params;
      const { questions } = req.body;
      const exercise = await Exercise.findByPk(exerciseId);

      if (!exercise) {
        res.status(404).json({ message: "Exercise not found" });
      }

      const newQuestions = await Question.bulkCreate(
        questions.map((question) => ({
          exerciseId,
          questionText: question.questionText,
          rootNote: question.rootNote,
          interval: question.interval,
          chordNotes: question.chordNotes,
          melody: question.melody,
          correctAnswer: question.correctAnswer,
          options: question.options,
        }))
      );

      res
        .status(201)
        .json({ message: "Questions created successfully.", newQuestions });
    } catch (error) {
      console.error("Error in POST /:exerciseId/questions:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//Get Questions for exercises

router.get("/:exerciseId/questions", async (req, res) => {
  try {
    const { exerciseId } = req.params;

    // Check if the exercise exists
    const exercise = await Exercise.findByPk(parseInt(exerciseId, 10));

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    // Fetch questions for the exercise
    const questions = await Question.findAll({
      where: { exerciseId },
      attributes: [
        "id",
        "questionText",
        "rootNote",
        "interval",
        "chordNotes",
        "melody",
        "options",
      ],
    });

    if (!questions.length) {
      return res
        .status(404)
        .json({ message: "No questions found for this exercise" });
    }

    return res.status(200).json({ questions });
  } catch (error) {
    console.error("Error in GET /:exerciseId/questions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Assign exercise to a student
router.post(
  "/:exerciseId/assign",
  requireAuth,
  checkRole("teacher"),
  async (req, res) => {
    try {
      const { exerciseId } = req.params;
      const { studentId } = req.body;

      const exercise = await Exercise.findByPk(parseInt(exerciseId, 10));

      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }

      const student = User.findByPk(parseInt(studentId, 10));
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const assignment = await Assignment.create({
        teacherId: req.user.id,
        studentId,
        exerciseId,
      });
      res.status(201).json(assignment);
    } catch (error) {
      console.error("Error in POST /:exerciseId/assign:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//Edit exercise
router.put(
  "/:exerciseId",
  requireAuth,
  checkRole("teacher"),
  async (req, res) => {
    try {
      const { exerciseId } = req.params;
      const { name, description, difficulty, type } = req.body;

      const exercise = await Exercise.findByPk(exerciseId);

      if (!exercise) {
        res.status(404).json({ message: "Exercise not found" });
      }

      const updatedExercise = await exercise.update({
        name,
        description,
        difficulty,
        type,
      });

      return res.status(200).json(updatedExercise);
    } catch (error) {
      console.error("Error in PUT /:exerciseId:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//Delete exercise
router.delete(
  "/:exerciseId",
  requireAuth,
  checkRole("teacher"),
  async (req, res) => {
    try {
      const { exerciseId } = req.params;
      const exercise = await Exercise.findByPk(exerciseId);

      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }

      await exercise.destroy();
      return res
        .status(200)
        .json({ message: "Exercise deleted successfully!" });
    } catch (error) {
      console.error("Error in DELETE /:exerciseId:".error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//Get Exercise by ID
router.get("/:exerciseId", async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const exercise = await Exercise.findOne({
      where: { id: exerciseId },
      include: [
        {
          model: Question,
        },
      ],
    });

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    return res.status(200).json({ exercise });
  } catch (error) {
    console.error("Error in GET /:exerciseId", error);
    return res.status(500), json({ message: "Internal Server Error" });
  }
});

//Get all exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.findAll();

    return res.status(200).json({ exercises });
  } catch (error) {
    console.error("Error in GET /api/exercises:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Create a new exercise
router.post("/", requireAuth, checkRole("teacher"), async (req, res) => {
  try {
    const { name, description, difficulty, type } = req.body;

    const newExercise = await Exercise.create({
      name,
      description,
      difficulty,
      type,
    });

    res.status(201).json(newExercise);
  } catch (error) {
    console.error("Error in POST /exercises:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
