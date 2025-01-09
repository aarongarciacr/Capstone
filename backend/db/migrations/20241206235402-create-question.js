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
    options.tableName = "Questions";
    await queryInterface.createTable(
      options.tableName,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        exerciseId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Exercises",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        questionText: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        rootNote: {
          type: Sequelize.STRING(5),
          allowNull: true, // For Interval Recognition
        },
        interval: {
          type: Sequelize.STRING(50),
          allowNull: true, // For Interval Recognition
        },
        chordNotes: {
          type: Sequelize.JSONB,
          allowNull: true, // For Chord Identification
        },
        melody: {
          type: Sequelize.JSONB,
          allowNull: true, // For Melody Transcription
        },
        correctAnswer: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        options: {
          type: Sequelize.JSONB,
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

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Questions";
    await queryInterface.dropTable(options);
  },
};
