"use strict";

const options = {};
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development_with_postgres"
) {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Sessions";
    await queryInterface.createTable(
      options.tableName,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "Users",
              schema: options.schema,
            },
            key: "id",
          },
          onDelete: "CASCADE",
        },
        exerciseId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "Exercises",
              schema: options.schema,
            },
            key: "id",
          },
          onDelete: "CASCADE",
        },
        startTime: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        endTime: {
          type: Sequelize.DATE,
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        accuracy: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0.0,
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
    options.tableName = "Sessions";
    await queryInterface.dropTable(options);
  },
};
