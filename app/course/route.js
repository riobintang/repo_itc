const express = require('express');
const authenticationToken = require("../../middleware/authenticationToken");
const loginAdmin = require('../../middleware/loginAdmin');
const {handlerGetAllCourse,  handlerGetCourseById, handlerPostCourse, handlerPutCourse, handlerDeleteCourse, handlerGetCourseByTitle, handlerGetCourseByPage} = require('./handler');
const upload = require("../../utils/multer");
const router = express.Router();

//API get course: GET /course/
router.get('/', authenticationToken, handlerGetAllCourse);
//API get course by id: GET /course/:id
router.get('/:id', authenticationToken, handlerGetCourseById);
//API get course with pagination: GET /course/page:page
router.get("/page/:page", authenticationToken, handlerGetCourseByPage);
//API get search course: GET /course/:title
router.get('/search/:title', authenticationToken, handlerGetCourseByTitle);
//API post course: POST /course/
router.post('/', authenticationToken, loginAdmin, upload.single("image"), handlerPostCourse);
//API update course: PUT /course/:id
router.put('/:id', authenticationToken, loginAdmin, upload.single("image"), handlerPutCourse);
//API delete course: DELETE /course/:id
router.delete('/:id', authenticationToken, loginAdmin, handlerDeleteCourse);

module.exports = router;