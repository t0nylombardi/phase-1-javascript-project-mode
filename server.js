// Description: This file is used to run the JSON server on Heroku.
// import jsonServer from "json-server";
jsonServer = require("json-server");

const jServer = jsonServer.create();
const router = jsonServer.router("src/db.json");
const middlewares = jsonServer.defaults({ static: "./build" });
const port = 3000;

jServer.use(middlewares);
jServer.use(router);
jServer.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
