const { application } = require('express');
const express = require('express');
const { refreshJWTHandler } = require('./handler');
const router = express.Router();

//API post refresh token: POST /token/refresh
router.post('/refresh', refreshJWTHandler);

module.exports = router;