require("dotenv").config();
const User = require("../../models/users/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ERRORS = require('../../utils/errors');
const UserService = require('../../services/Users/UserService');
const Api404Error = require('../../utils/HttpErrors/api404Error');
const Api401Error = require('../../utils/HttpErrors/api401Error');

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
    try {
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(ERRORS.error.e2.http).send(ERRORS.error.e2);
        }

        //Encrypt user password
        encrypted_password = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encrypted_password,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);

    } catch (err) {
        console.log(err);
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