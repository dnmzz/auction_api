const express = require("express");
const app = express();
app.use(express.json());
const CONSTANTS = require('./src/config/constants');
const api_base_url = CONSTANTS.API_BASE_URL;

// routes related to managing the users of the app
const user_routes = require('./src/api/routes/userRoutes');
app.use(api_base_url + '/users', user_routes);

module.exports = app;