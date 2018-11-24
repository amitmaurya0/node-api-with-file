var User = require('./../../models/user.model');
var appConfig = require('./../../shared/config');
var jwt = require('jsonwebtoken');
var config = require('./../../../config/database');
var userInfo = require('./../common/index');

var action = {};

action.get = function(req, res){
    var info = userInfo(req.headers.authorization);
    User.findOne({email: info.email}, function(err, data){
        if(data){
            var design = {
                name :{
                    first: data.name.first,
                    last: data.name.last
                },
                _id: data._id,
                email: data.email,
                city: data.city,
                address: data.address,
                profileImage: data.profileImage
            }
            res.json({status: true, data:design})
        }else{

        }
    })
}

module.exports  = action;