const express = require('express');
const authenticationToken = require("../../middleware/authenticationToken");
const loginAdmin = require('../../middleware/loginAdmin');
const {handlerGetCourse, handlerPostCourse, handlerPutCourse, handlerDeleteCourse} = require('./handler');
const router = express.Router();

router.get('/', authenticationToken, handlerGetCourse);
router.post('/', authenticationToken, loginAdmin, handlerPostCourse);
router.put('/:id', authenticationToken, loginAdmin, handlerPutCourse);
router.delete('/:id', authenticationToken, loginAdmin, handlerDeleteCourse);

module.exports = router;