const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const userRouter = require("./app/user/route");
const divisionRouter = require("./app/division/route");
const roleRouter = require("./app/role/route");
const courseRouter = require("./app/course/route");
const chapterRouter = require("./app/chapter/router");
const articleRouter = require("./app/article/route");
const discussionRouter = require("./app/discussion/route");
const commentRouter = require("./app/comment/route");
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

app.use("/users", userRouter);
app.use("/divisions", divisionRouter);
app.use("/roles", roleRouter);
app.use("/courses", courseRouter);
app.use("/courses", chapterRouter);
app.use("/courses", articleRouter);
app.use("/courses", discussionRouter);
app.use("/courses", commentRouter);
app.use("/password-reset", passwordResetRouter);


app.use(customErrorHandler);
app.use(handler404NotFound);

module.exports = app;