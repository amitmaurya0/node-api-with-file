var user = require('./user/index');
var router = require('express').Router();

router.use('/user', user);

module.exports = router;