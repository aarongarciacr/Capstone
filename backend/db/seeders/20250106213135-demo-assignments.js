"use strict";

const options = {};
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development_with_postgres"
) {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Assignments"; // Ensure table name matches
    await queryInterface.bulkInsert(
      options,
      [
        {
          teacherId: 1,
          studentId: 2,
          exerciseId: 1,
        },
        {
          teacherId: 1,
          studentId: 2,
          exerciseId: 2,
        },
        {
          teacherId: 1,
          studentId: 2,
          exerciseId: 3,
        },
        {
          teacherId: 1,
          studentId: 3,
          exerciseId: 1,
        },
        {
          teacherId: 1,
          studentId: 3,
          exerciseId: 2,
        },
        {
          teacherId: 1,
          studentId: 3,
          exerciseId: 3,
        },
        {
          teacherId: 1,
          studentId: 4,
          exerciseId: 1,
        },
        {
          teacherId: 1,
          studentId: 4,
          exerciseId: 2,
        },
      ],
      { validate: true } // Validate data before insertion
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Assignments";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        teacherId: {
          [Op.in]: [1],
        },
      },
      {}
    );
  },
};
