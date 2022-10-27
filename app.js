const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const userRouter = require("./app/user/route");
const divisionRouter = require("./app/division/route");
const customErrorHandler = require("./middleware/customErrorHandler");
const handler404NotFound = require("./middleware/handler404NotFound");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/division", divisionRouter);

app.use(customErrorHandler);
app.use(handler404NotFound);

module.exports = app;
