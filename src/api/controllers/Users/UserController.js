require("dotenv").config();
const User = require("../../models/users/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ERRORS = require('../../utils/errors');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-__v');

        if (users.length == 0) {
            res.status(ERRORS.error.e3.http).send(ERRORS.error.e3);
        } else {
            return res.status(200).send(users);
        }
    } catch (err) {
        console.log(err);
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
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(ERRORS.error.e8.http).send(ERRORS.error.e8);
        }

        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
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

            // user
            res.status(200).json(user);
        } else {
            res.status(ERRORS.error.e8.http).send(ERRORS.error.e8);
        }

    } catch (err) {
        console.log(err);
    }
}

exports.findUser = async (req, res) => {
    try {
        var id = req.params.id;
        const user = await User.findById(id);

        if (id && user && user.length != 0) {
            res.status(200).json(user);
        } else {
            res.status(ERRORS.error.e3.http).send(ERRORS.error.e3);
        }

    } catch (err) {
        console.log(err);
    }
}