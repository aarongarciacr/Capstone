"use strict";
/** @type {import('sequelize-cli').Migration} */

const options = {};
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development_with_postgres"
) {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Assignments";
    await queryInterface.createTable(
      options.tableName,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        teacherId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "Users", key: "id", schema: options },
          onDelete: "CASCADE",
        },
        studentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
        },
        exerciseId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "Exercises", key: "id" },
          onDelete: "CASCADE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Assignments";
    await queryInterface.dropTable(options);
  },
};
