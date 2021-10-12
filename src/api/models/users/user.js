const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {
        type: String, default: null
    },
    last_name: {
        type: String, default: null
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },

    token: {
        type: String
    },
});

module.exports = mongoose.model('User', userSchema);