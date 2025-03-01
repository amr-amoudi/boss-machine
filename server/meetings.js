const express = require('express');
const meeting = express.Router();
const {
    // takes a model name as the first argument
    getAllFromDatabase,
    // creates a meeting duh 🙄😑
    createMeeting,
    // yk
    deleteAllFromDatabase,
    addToDatabase
} = require('./db');


meeting.get("/", (req, res,next) => {
    res.status(200).send(getAllFromDatabase("meetings"));
})

meeting.post("/", (req, res,next) => {
    const newMeeting = createMeeting();
    addToDatabase("meetings", newMeeting);
    res.status(201).send(newMeeting);
})

meeting.delete("/", (req, res,next) => {
    deleteAllFromDatabase("meetings");
    res.status(204).send();
})

module.exports = meeting;


