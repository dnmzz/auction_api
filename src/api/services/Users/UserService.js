require("dotenv").config();
const User = require("../../models/users/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Api404Error = require('../../utils/HttpErrors/api404Error');
const Api401Error = require('../../utils/HttpErrors/api401Error');

exports.findUsers = async () => {
    const users = await User.find({}, '-__v -password');

    if (users && users.length == 0) {
        throw new Api404Error('Users not found.');
    }
    return users;
}

exports.findUserById = async (user_id) => {
    try {
        const user = await User.findById(user_id, '-__v  -password');

        if (!user) {
            throw new Api404Error(`User with id: ${user_id} not found.`);
        }

        return user;
    } catch (error) {
        throw new Api404Error(`User with id: ${user_id} not found.`);
    }
}

exports.findUserByEmail = async (user_email) => {
    const user = await User.findOne({ email: user_email });

    if (!user) {
        throw new Api404Error(`User with email: ${user_email} not found.`);
    }

    return user;
}

exports.generateToken = async (email, password) => {
    try {
        const user = await this.findUserByEmail(email);
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
            return user;
        } else {
            throw new Api401Error('Invalid Credentials');
        }
    } catch (error) {
        throw error;
    }
}