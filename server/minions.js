const express = require('express');
const {
    // takes a model name as the first argument
    getAllFromDatabase,
    // takes a model name as the first argument and id on the second argument
    getFromDatabaseById,
    // takes a model name as the first argument and the request body as the second argument
    addToDatabase,
    // takes a model name as the first argument and the id on the second argument
    deleteFromDatabasebyId,
    // takes a model name as the first argument and the request body as the second argument and the body must have the id init
    updateInstanceInDatabase,
} = require('./db');
const minionRouter = express.Router();

/*
* minions : {
*      id: "string", (auto set on add)
*      name: "string",
*      title: "string",
*      salary: "number"
*   }
*/

const checkValidRequest = (req, res, next) => {
    const requestBody = req.body;

    // if and item is missing in the body object it will throw an error
    if(!requestBody.name || !requestBody.title || !requestBody.salary) {
        const error = new Error("Minion's should have [name, title and salary]")
        error.status = 404;
        return next(error);
    }else if(typeof requestBody.salary === 'string') {
        const error = new Error("salary must be a number")
        error.status = 404;
        return next(error);
    }else {
        return next();
    }
};


minionRouter.param("minionId", (req, res, next,id) => {
    const minion = getFromDatabaseById("minions",id);

    if(minion) {
        req.minion = minion;
        req.id = id
        return next();
    }else {
        return next(new Error("Minion does not exist"));
    }
})

minionRouter.get('/', (req, res,next) => {
    const minions = getAllFromDatabase("minions");
    res.status(200).send(minions);
})

minionRouter.post('/', checkValidRequest,(req, res,next) => {
    const requestBody = req.body;
    addToDatabase("minions",requestBody);
    res.status(201).send();
})

//===============\\
//----with ID----\\
//===============\\

minionRouter.get('/:minionId', (req, res,next) => {
    const minion = req.minion;
    res.status(200).send(minion);
})

minionRouter.put('/:minionId', checkValidRequest,(req, res,next) => {
    const id = req.id;
    const body = req.body;
    updateInstanceInDatabase("minions",{...body, id});
    res.send(201).send();
})

minionRouter.delete('/:minionId',checkValidRequest, (req, res,next) => {
    const id = req.id;
    deleteFromDatabasebyId("minions",id);
    res.status(204).send();
})

// error middleware
minionRouter.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    res.status(statusCode).send(error.message);
});

module.exports = minionRouter;