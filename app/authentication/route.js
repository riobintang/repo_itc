const express = require('express');
const authenticationToken = require('../../middleware/authenticationToken');
const { refreshJWTHandler } = require('./handler');
const router = express.Router();

//API post refresh token: POST /token/refresh
router.post('/refresh', authenticationToken, refreshJWTHandler);

module.exports = router;