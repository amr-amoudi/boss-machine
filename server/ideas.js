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
const {checkMillionDollarIdea} = require('./checkMillionDollarIdea');


const {errorHandler, getItemById, checkValidBody} = require('./utils');
const ideas = express.Router();

// const checkValidBody = (req, res, next) => {
//     const requestBody = req.body;
//
//     // if an item is missing in the body object it will throw an error
//     if(
//         !requestBody.name ||
//         !requestBody.numWeeks ||
//         !requestBody.description ||
//         !requestBody.weeklyRevenue
//     ) {
//         const error = new Error("idea's should have [name, description, numWeeks and weeklyRevenue]")
//         error.status = 404;
//         return next(error);
//     }else if(
//         typeof requestBody.numWeeks === 'string' ||
//         typeof requestBody.weeklyRevenue === 'string'
//     ) {
//         const error = new Error("numWeeks and weeklyRevenue must be a number")
//         error.status = 404;
//         return next(error);
//     }else {
//         return next();
//     }
// };

ideas.param("ideaId", getItemById)

ideas.get("/", (req, res, next) => {
    res.send(getAllFromDatabase("ideas"));
})

ideas.post("/", checkValidBody, checkMillionDollarIdea,(req, res, next) => {
    const body = req.body;
    addToDatabase("ideas", body);
    res.status(201).send();
})

//===============\\
//----with ID----\\
//===============\\

ideas.get("/:ideaId", (req, res, next) => {
    const item = req.item;
    res.status(200).send(item);
})

ideas.put("/:ideaId", checkValidBody, checkMillionDollarIdea,(req, res, next) => {
    const id = req.id;
    const body = req.body;
    updateInstanceInDatabase("ideas", {...body, id: id});
    res.status(204).send();
})

ideas.delete("/:ideaId", (req, res, next) => {
    deleteFromDatabasebyId("ideas", req.id);
    res.status(204).send();
})

ideas.use(errorHandler)


module.exports = ideas;