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

    getFromDatabaseById
} = require('./db');

const {errorHandler} = require('./utils');

const work = express.Router({mergeParams: true});

work.use("/:workId", (req, res, next) => {
    const item = getFromDatabaseById("work", req.params.workId);
    if (!item) {
        return res.status(404).send({error: "Work not found"});
    }
    req.workItem = item;
    next();
});


work.get('/', (req, res) => {
    const allWork = getAllFromDatabase("work").filter(work => work.minionId === req.params.minionId);
    res.status(200).send(allWork);
});

work.put("/:workId",(req, res, next) => {
    const id = req.params.workId;
    const item = req.workItem;
    const body = req.body;
    const newWork = {...item,...body, id};
    try{
        updateInstanceInDatabase("work", newWork)
        res.status(200).send(newWork);
    }catch(e){
        const error = new Error("can't find work");
        error.status = 400;
        next(error);
    }
})

work.delete("/:workId",(req, res,next) => {
    const id = req.params.workId;
    const d = deleteFromDatabasebyId("work",id);
    res.status(204).send(d);
})

work.use(errorHandler);


module.exports = {work};

