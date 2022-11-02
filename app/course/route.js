const express = require('express');
const authenticationToken = require("../../middleware/authenticationToken");
const loginAdmin = require('../../middleware/loginAdmin');
const {handlerGetCourse, handlerPostCourse, handlerPutCourse, handlerDeleteCourse} = require('./handler');
const router = express.Router();

//API get course: GET /course/
router.get('/', authenticationToken, handlerGetCourse);
//API post course: POST /course/
router.post('/', authenticationToken, loginAdmin, handlerPostCourse);
//API update course: PUT /course/:id
router.put('/:id', authenticationToken, loginAdmin, handlerPutCourse);
//API delete course: DELETE /course/:id
router.delete('/:id', authenticationToken, loginAdmin, handlerDeleteCourse);

module.exports = router;