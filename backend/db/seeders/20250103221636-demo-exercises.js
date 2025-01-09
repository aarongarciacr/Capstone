"use strict";

const { Exercise } = require("../models");

const options = {};
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development_with_postgres"
) {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Exercise.bulkCreate(
      [
        {
          name: "Interval Recognition",
          description: "Identify intervals between two notes",
          difficulty: "Beginner",
          type: "Interval Recognition",
        },
        {
          name: "Chord Identification",
          description: "Identify chords by their sound",
          difficulty: "Intermediate",
          type: "Chord Identification",
        },
        {
          name: "Melody Transcription",
          description: "Listen and transcribe melodies",
          difficulty: "Advanced",
          type: "Melody Transcription",
        },
      ],
      { validate: true } // Validate data before insertion
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Exercise";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Interval Recognition",
            "Chord Identification",
            "Melody Transcription",
          ],
        },
      },
      {}
    );
  },
};
