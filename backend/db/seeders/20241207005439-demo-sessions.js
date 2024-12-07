"use strict";

const options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in the options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Sessions", [
      {
        userId: 1,
        exerciseId: 1,
        startTime: new Date(),
        endTime: new Date(),
        score: 85,
        accuracy: 90.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        exerciseId: 2,
        startTime: new Date(),
        endTime: new Date(),
        score: 70,
        accuracy: 75.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Sessions";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: {
          [Op.eq]: [1, 2],
        },
      },
      {}
    );
  },
};
