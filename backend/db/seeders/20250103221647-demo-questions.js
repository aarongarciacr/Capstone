"use strict";

const { Question } = require("../models");

const options = {};
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development_with_postgres"
) {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Question.bulkCreate(
      [
        {
          exerciseId: 1,
          questionText: "What is the interval between C and G?",
          rootNote: "C",
          interval: "Perfect Fifth",
          options: ["Perfect Fifth", "Major Third", "Minor Sixth"],
          correctAnswer: "Perfect Fifth", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
        {
          exerciseId: 1,
          questionText: "What is the interval between A and E?",
          rootNote: "A",
          interval: "Perfect Fifth",
          options: ["Perfect Fifth", "Major Second", "Minor Third"],
          correctAnswer: "Perfect Fifth", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
        {
          exerciseId: 1,
          questionText: "What is the interval between F and A?",
          rootNote: "F",
          interval: "Major Third",
          options: ["Major Third", "Perfect Fourth", "Minor Sixth"],
          correctAnswer: "Major Third", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
        {
          exerciseId: 1,
          questionText: "What is the interval between D and F#?",
          rootNote: "D",
          interval: "Major Third",
          options: ["Major Third", "Perfect Fifth", "Minor Third"],
          correctAnswer: "Major Third", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
        {
          exerciseId: 2,
          questionText: "Identify this chord: C-E-G.",
          chordNotes: ["C", "E", "G"],
          options: ["Major", "Minor", "Diminished"],
          correctAnswer: "Major", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
        {
          exerciseId: 2,
          questionText: "Identify this chord: A-C-E.",
          chordNotes: ["A", "C", "E"],
          options: ["Minor", "Major", "Diminished"],
          correctAnswer: "Minor", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
        {
          exerciseId: 2,
          questionText: "Identify this chord: F-A-C.",
          chordNotes: ["F", "A", "C"],
          options: ["Major", "Minor", "Augmented"],
          correctAnswer: "Major", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
        {
          exerciseId: 2,
          questionText: "Identify this chord: G-Bb-D.",
          chordNotes: ["G", "Bb", "D"],
          options: ["Minor", "Diminished", "Major"],
          correctAnswer: "Minor", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
        {
          exerciseId: 3,
          questionText: "Transcribe this melody: C-D-E.",
          melody: ["C", "D", "E"],
          options: ["C-D-E", "C-E-G", "C-F-A"],
          correctAnswer: "C-D-E", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
        {
          exerciseId: 3,
          questionText: "Transcribe this melody: G-A-B.",
          melody: ["G", "A", "B"],
          options: ["G-A-B", "G-B-D", "G-C-E"],
          correctAnswer: "G-A-B", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
        {
          exerciseId: 3,
          questionText: "Transcribe this melody: A-B-C#.",
          melody: ["A", "B", "C#"],
          options: ["A-B-C#", "A-C#-E", "A-B-D"],
          correctAnswer: "A-B-C#", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
        {
          exerciseId: 3,
          questionText: "Transcribe this melody: E-F#-G#.",
          melody: ["E", "F#", "G#"],
          options: ["E-F#-G#", "E-G#-B", "E-F#-A"],
          correctAnswer: "E-F#-G#", // Add correctAnswer
          createdAt: new Date(), // Add createdAt
          updatedAt: new Date(), // Add updatedAt
        },
      ],
      { validate: true } // Validate data before insertion
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Questions";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        exerciseId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
