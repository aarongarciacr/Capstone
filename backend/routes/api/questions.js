const express = require("express");
const { Exercise, Session, Question } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

module.exports = router;
