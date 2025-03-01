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
const checkMillionDollarIdea = require('./checkMillionDollarIdea');


const {errorHandler, getItemById, checkValidBody} = require('./utils');
const ideas = express.Router();


ideas.param("ideaId", getItemById)

ideas.get("/", (req, res, next) => {
    res.send(getAllFromDatabase("ideas"));
})

ideas.post("/", checkValidBody, checkMillionDollarIdea,(req, res, next) => {
    const body = req.body;
    addToDatabase("ideas", body);
    res.status(201).send(body);
})

//===============\\
//----with ID----\\
//===============\\

ideas.get("/:ideaId", (req, res, next) => {
    const item = req.item;
    res.status(200).send(item);
})

ideas.put("/:ideaId",(req, res, next) => {
    const id = req.id;
    const item = req.item;
    const body = req.body;
    const newIdea = {...item,...body, id};
    updateInstanceInDatabase("ideas", newIdea);
    res.status(200).send(newIdea);
})

ideas.delete("/:ideaId", (req, res, next) => {
    deleteFromDatabasebyId("ideas", req.id);
    res.status(204).send();
})

ideas.use(errorHandler)


module.exports = ideas;