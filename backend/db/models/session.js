"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Session.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      Session.belongsTo(models.Exercise, {
        foreignKey: "exerciseId",
        onDelete: "CASCADE",
      });
      Session.hasMany(models.Answer, {
        foreignKey: "sessionId",
        onDelete: "CASCADE",
      });
    }
  }
  Session.init(
    {
      userId: DataTypes.INTEGER,
      exerciseId: DataTypes.INTEGER,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      score: DataTypes.INTEGER,
      accuracy: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Session",
    }
  );
  return Session;
};
