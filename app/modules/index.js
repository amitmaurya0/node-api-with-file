var user = require('./user/index');
var router = require('express').Router();

var passport = require('passport');
require('./../../config/passport')(passport);
var jwt = require('jsonwebtoken');
var userInfo = require('./common/index');

router.use('/userauth', user);
router.use('/user', passport.authenticate('jwt', {session:false}), function(req, res){
    console.log('====================================');
    console.log('Hello');
    console.log('====================================');
})


router.get('/checkAuth', passport.authenticate('jwt', {session:false}), function(req, res){
    var info = userInfo(req.headers.authorization);
    res.json({status:true, name:info.name, email:info.email});
});

module.exports = router;