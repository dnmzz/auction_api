const jwt = require("jsonwebtoken");
const config = process.env;
const ERRORS = require('../utils/errors');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.authorization;

    if (!token) {
        return res.status(ERRORS.error.e5.http).send(ERRORS.error.e5);
    }
    try {
        const decoded = jwt.verify(token.split(" ")[1], config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(ERRORS.error.e5.http).send(ERRORS.error.e5);
    }
    next();
};

module.exports = verifyToken;