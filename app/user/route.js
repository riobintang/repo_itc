const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('respond send with resource')
});

module.exports = router;