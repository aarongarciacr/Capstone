"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.hasMany(models.Answer, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
      });
      Question.belongsTo(models.Exercise, {
        foreignKey: "exerciseId",
        onDelete: "CASCADE",
      });
    }
  }
  Question.init(
    {
      exerciseId: DataTypes.INTEGER,
      questionText: DataTypes.TEXT,
      correctAnswer: DataTypes.STRING,
      options: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
