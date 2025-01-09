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
    options.tableName = "Answers";
    await queryInterface.createTable(
      options.tableName,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        sessionId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "Sessions",
              schema: options.schema,
            },
            key: "id",
          },
          onDelete: "CASCADE",
        },
        questionId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "Questions",
              schema: options.schema,
            },
            key: "id",
          },
          onDelete: "CASCADE",
        },
        selectedAnswer: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        isCorrect: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
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
    options.tableName = "Answers";
    await queryInterface.dropTable(options);
  },
};
