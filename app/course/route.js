const express = require('express');
const authenticationToken = require("../../middleware/authenticationToken");
const loginAdmin = require('../../middleware/loginAdmin');
const {handlerGetAllCourse,  handlerGetCourseById, handlerPostCourse, handlerPutCourse, handlerDeleteCourse, handlerGetCourseByTitle, handlerGetCourseByPage, handlerGetCourseForMobile} = require('./handler');
const upload = require("../../utils/multer");
const { validateCoursePhotoSchema } = require('../../validator/course');
const router = express.Router();

//API get course: GET /courses/
router.get('/', authenticationToken, handlerGetAllCourse);
//API get course for mobile: GET /courses/
router.get("/mobile", authenticationToken, handlerGetCourseForMobile);
//API get course by id: GET /courses/:id
router.get('/:id', authenticationToken, handlerGetCourseById);


//API post course: POST /course/
router.post('/', authenticationToken, loginAdmin, upload.single("image"), handlerPostCourse);
//API update course: PUT /course/:id
router.put('/:id', authenticationToken, loginAdmin, upload.single("image"), handlerPutCourse);
//API delete course: DELETE /course/:id
router.delete('/:id', authenticationToken, loginAdmin, handlerDeleteCourse);

module.exports = router;