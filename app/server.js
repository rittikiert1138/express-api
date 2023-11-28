// import express from 'express';
const routes = require("./routes");
const path = require("path");
const config = require("./config/constants");
const db = require("./db/index.js");
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();

db.sequelize.sync();

app.use(cors());
app.use(express.json());

app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  fileupload({
    createParentPath: true,
  })
);

app.use(config.prefix, routes);

app.listen(config.port, () => {
  console.log(`
    Port: ${config.port}
    Env: ${app.get("env")}
  `);
});
