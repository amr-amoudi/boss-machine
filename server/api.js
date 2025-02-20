const express = require('express');
const minions = require("./minions")
const ideas = require("./ideas");
const meetings = require("./meetings");
const apiRouter = express.Router();

apiRouter.use("/minions", minions);
apiRouter.use("/ideas", ideas);
apiRouter.use("/meetings", meetings)

module.exports = apiRouter;
