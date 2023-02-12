const express = require('express');
const { getAllRoleHandler, handlerGetRoleById } = require('./handler');
const router = express.Router();

//API get All Role: GET /role/
router.get('/', getAllRoleHandler);
//API get Role by id: GET /role/:id
router.get('/:id', handlerGetRoleById);

module.exports = router;