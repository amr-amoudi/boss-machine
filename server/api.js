const express = require('express');
const minions = require("./minions")
const apiRouter = express.Router();

apiRouter.use("/minions", minions);

module.exports = apiRouter;
