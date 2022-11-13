const express = require('express');
const authenticationToken = require("../../middleware/authenticationToken");
const loginAdmin = require('../../middleware/loginAdmin');
const {handlerGetAllCourse, handlerPostCourse, handlerPutCourse, handlerDeleteCourse, handlerGetCourseByTitle} = require('./handler');
const upload = require("../../utils/multer");
const router = express.Router();

//API get course: GET /course/
router.get('/', authenticationToken, handlerGetAllCourse);
//API get search course: GET /course/:title
router.get('/search/:title', authenticationToken, handlerGetCourseByTitle);
//API post course: POST /course/
router.post('/', authenticationToken, loginAdmin, upload.single("image"), handlerPostCourse);
//API update course: PUT /course/:id
router.put('/:id', authenticationToken, loginAdmin, upload.single("image"), handlerPutCourse);
//API delete course: DELETE /course/:id
router.delete('/:id', authenticationToken, loginAdmin, handlerDeleteCourse);

module.exports = router;