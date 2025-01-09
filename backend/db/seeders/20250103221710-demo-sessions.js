"use strict";

const { Session } = require("../models");

const options = {};
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development_with_postgres"
) {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Session.bulkCreate(
      [
        {
          userId: 2,
          exerciseId: 1,
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 600000),
          score: 85,
          accuracy: 90.5,
        },
        {
          userId: 2,
          exerciseId: 1,
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 605000),
          score: 60,
          accuracy: 50.5,
        },
        {
          userId: 2,
          exerciseId: 1,
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 700000),
          score: 90,
          accuracy: 95.5,
        },
        {
          userId: 2,
          exerciseId: 2,
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 500000),
          score: 85,
          accuracy: 90.5,
        },
        {
          userId: 2,
          exerciseId: 3,
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 600000),
          score: 100,
          accuracy: 100,
        },
        {
          userId: 3,
          exerciseId: 2,
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 1200000),
          score: 70,
          accuracy: 75.2,
        },
        {
          userId: 4,
          exerciseId: 3,
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 900000),
          score: 92,
          accuracy: 98.1,
        },
      ],
      { validate: true } // Validate data before insertion
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Session";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: {
          [Op.in]: [2, 3, 4],
        },
      },
      {}
    );
  },
};
