"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercise.hasMany(models.Session, {
        foreignKey: "exerciseId",
        onDelete: "CASCADE",
      });
      Exercise.hasMany(models.Question, {
        foreignKey: "exercisedId",
        onDelete: "CASCADE",
      });
    }
  }
  Exercise.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      difficulty: DataTypes.ENUM("Beginner", "Intermediate", "Advanced"),
    },
    {
      sequelize,
      modelName: "Exercise",
    }
  );
  return Exercise;
};
