require("dotenv").config();
const User = require("../../models/users/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ERRORS = require('../../utils/errors');
const UserService = require('../../services/Users/UserService');
const Api400Error = require('../../utils/HttpErrors/api400Error');
const Api401Error = require('../../utils/HttpErrors/api401Error');
const Api404Error = require('../../utils/HttpErrors/api404Error');

exports.getUsers = async (req, res) => {
    try {
        const users = await UserService.findUsers();
        res.status(200).send(users);
    } catch (err) {
        if (err instanceof Api404Error) {
            res.status(err.statusCode).send(err);
        }
    }
}

exports.signup = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
        res.status(ERRORS.error.e8.http).send(ERRORS.error.e8);
    }

    try {
        const response = await UserService.createUserAccount(first_name, last_name, email, password);
        res.status(201).json(response);
    } catch (err) {
        if (err instanceof Api400Error) {
            res.status(err.statusCode).send(err);
        }
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(ERRORS.error.e8.http).send(ERRORS.error.e8);
    }

    try {
        const response = await UserService.generateToken(email, password);
        res.status(200).json(response);
    } catch (err) {
        if (err instanceof Api404Error) {
            res.status(err.statusCode).send(err);
        } else if (err instanceof Api401Error) {
            res.status(err.statusCode).send(err);
        }
    }
}

exports.getUser = async (req, res) => {
    var id = req.params.id;

    if (id) {
        try {
            const user = await UserService.findUserById(id);
            res.status(200).json(user);
        } catch (err) {
            if (err instanceof Api404Error) {
                res.status(err.statusCode).send(err);
            }
        }
    } else {
        res.status(ERRORS.error.e8.http).send(ERRORS.error.e8);
    }
}