"use strict";

const options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in the options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Exercises", [
      {
        name: "Interval Recognition",
        description: "Identify intervals between two notes.",
        difficulty: "Beginner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chord Identification",
        description: "Classify chords by type.",
        difficulty: "Intermediate",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Melody Transcription",
        description: "Write down the melody you hear.",
        difficulty: "Advanced",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Exercises";
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
