const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");
const userSessionRouter = require("./user-session.js");
const usersRouter = require("./users.js");
const exercisesRouter = require("./exercises.js");
const sessionsRouter = require("./sessions.js");
const assignmentsRouter = require("./assignments.js");
// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use("/userSession", userSessionRouter);
router.use("/users", usersRouter);
router.use("/exercises", exercisesRouter);
router.use("/sessions", sessionsRouter);
router.use("/assignments", assignmentsRouter);

module.exports = router;
