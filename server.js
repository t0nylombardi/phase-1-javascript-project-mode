// Description: This file is used to run the JSON server on Heroku.
// import jsonServer from "json-server";
jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("src/db.json");
const middlewares = jsonServer.defaults({ static: "./build" });
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
console.log(`JSON Server is running on port ${port}`);
server.listen(port);
