"use strict";

const options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in the options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Questions", [
      {
        exerciseId: 1,
        questionText: "What is the interval between C and G?",
        correctAnswer: "Perfect Fifth",
        options: JSON.stringify([
          "Perfect Fifth",
          "Major Third",
          "Minor Sixth",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exerciseId: 2,
        questionText: "Identify this chord: C-E-G.",
        correctAnswer: "Major",
        options: JSON.stringify(["Major", "Minor", "Diminished"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Questions";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        exerciseId: {
          [Op.eq]: [1, 2],
        },
      },
      {}
    );
  },
};
