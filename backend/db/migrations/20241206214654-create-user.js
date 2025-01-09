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
    options.tableName = "Users"; // Specify the table name explicitly
    await queryInterface.createTable(
      options.tableName,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        role: {
          type: Sequelize.ENUM("student", "teacher"),
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING(256),
          allowNull: false,
          unique: true,
        },
        hashedPassword: {
          type: Sequelize.STRING.BINARY,
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
    options.tableName = "Users";
    await queryInterface.dropTable(options);
  },
};
