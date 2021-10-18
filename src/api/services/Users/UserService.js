require("dotenv").config();
const User = require("../../models/users/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUser = async () => {
    try {
        const users = await User.find({}, '-__v');
        return users;
    } catch (err) {
        throw new Error(err.message);
    }
}

exports.findUserById = async (user_id) => {
    try {
        const user = await User.findById(user_id, '-__v');
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}

exports.findUserByEmail = async (user_email) => {
    try {
        const user = await User.findOne({ user_email });
        console.log(user);
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}