const {getFromDatabaseById} = require("./db");
const {apiBodies} = require("./bodies");

const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || 500;
    res.status(statusCode).send(error.message);
};

const getItemById = (req, res, next, id) => {
    const item = getFromDatabaseById(req.baseUrl.split('/')[2], id);

    console.log(item)
    if(item) {
        req.item = item;
        req.id = id
        return next();
    }else {
        const error = new Error('item not Found');
        error.status = 400;
        return next(error);
    }
}

const checkValidBody = (req, res, next) => {
    const model = req.baseUrl.split('/')[2];
    const requestBody = req.body;

    for(let key in apiBodies[model]){
        if(requestBody[key] === undefined) {
            const error = new Error(`${model}'s must have all properties: ${JSON.stringify(apiBodies[model])}`);
            error.status = 400;
            next(error);
        }

        if(typeof requestBody[key] !== apiBodies[model][key]){
            const error = new Error(`${key} must be a ${apiBodies[model][key]}`);
            error.status = 400;
            return next(error);
        }
    }

    next()
}

module.exports = {
    errorHandler,
    getItemById,
    checkValidBody
};