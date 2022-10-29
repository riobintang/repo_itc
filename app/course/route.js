const express = require('express');
const authenticationToken = require("../../middleware/authenticationToken");
const loginAdmin = require('../../middleware/loginAdmin');
const {handlerGetCourse, handlerPostCourse} = require('./handler');
const router = express.Router();

router.get('/', authenticationToken, handlerGetCourse);
router.post('/', authenticationToken, loginAdmin, handlerPostCourse);
router.put('/', );
router.delete('/', );

module.exports = router;