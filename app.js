const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const userRouter = require("./app/user/route");
const divisionRouter = require("./app/division/route");
const roleRouter = require("./app/role/route");
const courseRouter = require("./app/course/route");
const chapterRouter = require("./app/chapter/router");
const passwordResetRouter = require("./app/passwordReset/route");
const customErrorHandler = require("./middleware/customErrorHandler");
const handler404NotFound = require("./middleware/handler404NotFound");
const app = express();
require('dotenv').config();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/division", divisionRouter);
app.use("/role", roleRouter);
app.use("/course", courseRouter);
app.use("/course", chapterRouter);
app.use("/password-reset", passwordResetRouter);


app.use(customErrorHandler);
app.use(handler404NotFound);

module.exports = app;