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
    options.tableName = "Exercises"; // Specify the table name explicitly
    await queryInterface.createTable(
      options.tableName,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        difficulty: {
          type: Sequelize.ENUM("Beginner", "Intermediate", "Advanced"),
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isIn: [
              [
                "Interval Recognition",
                "Chord Identification",
                "Melody Transcription",
              ],
            ],
          },
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
    options.tableName = "Exercises";
    await queryInterface.dropTable(options);
  },
};
