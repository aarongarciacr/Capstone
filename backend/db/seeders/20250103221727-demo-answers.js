"use strict";

const { Answer } = require("../models");
const options = {};
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development_with_postgres"
) {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Answer.bulkCreate(
      [
        // Interval Recognition (Exercise 1)
        {
          sessionId: 1,
          questionId: 1, // "What is the interval between C and G?"
          selectedAnswer: "Perfect Fifth",
          isCorrect: true,
        },
        {
          sessionId: 1,
          questionId: 2, // "What is the interval between A and E?"
          selectedAnswer: "Major Second",
          isCorrect: false,
        },
        {
          sessionId: 1,
          questionId: 3, // "What is the interval between F and A?"
          selectedAnswer: "Major Third",
          isCorrect: true,
        },
        {
          sessionId: 1,
          questionId: 4, // "What is the interval between D and F#?"
          selectedAnswer: "Perfect Fifth",
          isCorrect: false,
        },

        // Chord Identification (Exercise 2)
        {
          sessionId: 2,
          questionId: 5, // "Identify this chord: C-E-G."
          selectedAnswer: "Major",
          isCorrect: true,
        },
        {
          sessionId: 2,
          questionId: 6, // "Identify this chord: A-C-E."
          selectedAnswer: "Minor",
          isCorrect: true,
        },
        {
          sessionId: 2,
          questionId: 7, // "Identify this chord: F-A-C."
          selectedAnswer: "Major",
          isCorrect: true,
        },
        {
          sessionId: 2,
          questionId: 8, // "Identify this chord: G-Bb-D."
          selectedAnswer: "Major",
          isCorrect: false,
        },

        // Melody Transcription (Exercise 3)
        {
          sessionId: 3,
          questionId: 9, // "Transcribe this melody: C-D-E."
          selectedAnswer: "C-D-E",
          isCorrect: true,
        },
        {
          sessionId: 3,
          questionId: 10, // "Transcribe this melody: G-A-B."
          selectedAnswer: "G-B-D",
          isCorrect: false,
        },
        {
          sessionId: 3,
          questionId: 11, // "Transcribe this melody: A-B-C#."
          selectedAnswer: "A-B-C#",
          isCorrect: true,
        },
        {
          sessionId: 3,
          questionId: 12, // "Transcribe this melody: E-F#-G#."
          selectedAnswer: "E-F#-A",
          isCorrect: false,
        },
      ],
      { validate: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Answers"; // Specify the table name explicitly
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        sessionId: {
          [Op.in]: [1, 2, 3], // Match seeded session IDs
        },
      },
      {}
    );
  },
};
