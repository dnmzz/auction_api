require("dotenv").config();
require("./src/config/database").connect();
const express = require("express");

const app = express();

app.use(express.json());

// Logic goes here

app.get('/', (req, res) => {
    res.send('Testing receiving a simple response.')
});

module.exports = app;