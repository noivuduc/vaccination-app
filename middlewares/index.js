"use strict";
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

class MiddlewareIndex {
  constructor(app) {
    this.app = app;
  }
  configureMiddlewares() {
    console.log("Initialize middleware..");
    //Middlewares

    this.app.options("*", cors()); //enable preflight for all routes
    this.app.use(morgan("combined"));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json({ limit: "5mb" }));
    this.app.use(bodyParser.json());
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        preflightContinue: true,
      })
    );
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: "34SDgsdgspu3sdfsdfdfsG",
        resave: false,
        saveUninitialized: true,
      })
    );

    console.log("Initialize middleware..end");
  }
}

module.exports = (app) => {
  return new MiddlewareIndex(app);
};
