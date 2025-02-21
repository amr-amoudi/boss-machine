const express = require('express');

const {
    // takes a model name as the first argument
    getAllFromDatabase,
    // takes a model name as the first argument and the request body as the second argument
    addToDatabase,
    // takes a model name as the first argument and the id on the second argument
    deleteFromDatabasebyId,
    // takes a model name as the first argument and the request body as the second argument and the body must have the id init
    updateInstanceInDatabase,
} = require('./db');


const {errorHandler,getItemById, checkValidBody} = require('./utils');
const {work} = require("./work");
const minionRouter = express.Router();

minionRouter.param("minionId", getItemById)

minionRouter.get('/', (req, res,next) => {
    const minions = getAllFromDatabase("minions");
    res.status(200).send(minions);
})

minionRouter.post('/', checkValidBody,(req, res, next) => {
    const requestBody = req.body;
    addToDatabase("minions",requestBody);
    res.status(201).send(requestBody);
})

//===============\\
//----with ID----\\
//===============\\

minionRouter.get('/:minionId', (req, res,next) => {
    const item = req.item;
    res.status(200).send(item);
})

minionRouter.put('/:minionId',(req, res, next) => {
    const id = req.id;
    const item = req.item;
    const body = req.body;
    const newMinion = {...item,...body, id};
    updateInstanceInDatabase("minions",newMinion);
    res.status(200).send(newMinion);
})

minionRouter.delete('/:minionId', (req, res, next) => {
    const id = req.id;
    deleteFromDatabasebyId("minions",id);
    res.status(204).send();
})

minionRouter.use("/:minionId/work",work)

// error middleware
minionRouter.use(errorHandler);

module.exports = minionRouter;