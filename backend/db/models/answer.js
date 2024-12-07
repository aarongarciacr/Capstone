"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Session, {
        foreignKey: "sessionId",
        onDelete: "CASCADE",
      });
      Answer.belongsTo(models.Question, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
      });
    }
  }
  Answer.init(
    {
      sessionId: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
      selectedAnswer: DataTypes.STRING,
      isCorrect: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
