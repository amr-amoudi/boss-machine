const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;

    if(numWeeks * weeklyRevenue < 1000000){
        return res.status(400).send("idea doesn't worth million dollars")
    }

    next()
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = {checkMillionDollarIdea};
