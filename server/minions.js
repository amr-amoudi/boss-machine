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
const minionRouter = express.Router();

minionRouter.param("minionId", getItemById)

minionRouter.get('/', (req, res,next) => {
    const minions = getAllFromDatabase("minions");
    res.status(200).send(minions);
})

minionRouter.post('/', checkValidBody,(req, res, next) => {
    const requestBody = req.body;
    addToDatabase("minions",requestBody);
    res.status(201).send();
})

//===============\\
//----with ID----\\
//===============\\

minionRouter.get('/:minionId', (req, res,next) => {
    const item = req.item;
    res.status(200).send(item);
})

minionRouter.put('/:minionId', checkValidBody,(req, res, next) => {
    const id = req.id;
    const body = req.body;
    updateInstanceInDatabase("minions",{...body, id});
    res.send(204).send();
})

minionRouter.delete('/:minionId',checkValidBody, (req, res, next) => {
    const id = req.id;
    deleteFromDatabasebyId("minions",id);
    res.status(204).send();
})

// error middleware
minionRouter.use(errorHandler);

module.exports = minionRouter;