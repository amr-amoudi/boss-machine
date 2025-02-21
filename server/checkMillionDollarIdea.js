const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;

    if (!numWeeks || !weeklyRevenue) {
        const error = new Error('numWeeks or weeklyRevenue does not exist');
        error.status = 400;
        return res.status(400).send(error);
    }

    if (!Number(numWeeks) || !Number(weeklyRevenue)) {
        const error = new Error('numWeeks or weeklyRevenue are not numbers');
        error.status = 400;
        return res.status(400).send(error);
    }

    if (numWeeks * weeklyRevenue < 1000000) {
        return res.status(400).send("idea doesn't worth a million dollars");
    }

    next();
}


// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
