"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assignment.belongsTo(models.User, {
        foreignKey: "teacherId",
        as: "teacher",
        onDelete: "CASCADE",
      });
      Assignment.belongsTo(models.User, {
        foreignKey: "studentId",
        as: "student",
        onDelete: "CASCADE",
      });
      Assignment.belongsTo(models.Exercise, {
        foreignKey: "exerciseId",
        onDelete: "CASCADE",
      });
    }
  }
  Assignment.init(
    {
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Assignment",
    }
  );
  return Assignment;
};
