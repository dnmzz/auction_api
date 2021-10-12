const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const connect_db = require("./src/config/database");

connect_db.connect();

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});