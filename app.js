const express = require("express");
const app = express();
app.use(express.json());

// routes related to managing the users of the app
const user_routes = require('./src/api/routes/userRoutes');
app.use('/users', user_routes);

module.exports = app;