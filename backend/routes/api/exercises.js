const express = require("express");
const { Exercise } = require("../../db/models/exercise");

const router = express.Router("/exercises");

//Get all exercises
router.get("/", async (req, res) => {
  try {
    const exercise = await Exercise.findAll();

    return res.status(200).json({ exercises: exercise });
  } catch (error) {
    console.error("Error in GET /api/exercises:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
