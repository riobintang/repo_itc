const express = require('express');
const { getAllRoleHandler } = require('./handler');
const router = express.Router();

//API get All Role: GET /role/
router.get('/', getAllRoleHandler);

module.exports = router;