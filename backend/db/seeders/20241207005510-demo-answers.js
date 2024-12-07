"use strict";

const options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in the options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Answers", [
      {
        sessionId: 1,
        questionId: 1,
        selectedAnswer: "Perfect Fifth",
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sessionId: 2,
        questionId: 2,
        selectedAnswer: "Minor",
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Answers";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        sessionId: {
          [Op.eq]: [1, 2],
        },
      },
      {}
    );
  },
};
