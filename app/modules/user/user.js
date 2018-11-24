var User = require('./../../models/user.model');
var appConfig = require('./../../shared/config');
var jwt = require('jsonwebtoken');
var config = require('./../../../config/database');

var user = {};

user.create = function(req, res){
    var image_name = '';
    if(req.file)
        image_name = appConfig.userServeFile+"/"+req.file.filename;
    else
        image_name = '';
    
  
    var input = req.body; 

    var newUser = new User({
        name: {
            first: input.first_name,
            last: input.last_name
        },
        address: input.address,
        city: input.city,
        email: input.email,
        password: input.password,
        profileImage: image_name,
    })

    User.findOne({email: input.email}, function(err, data){
        if(data){
            res.json({status:false, msg: "This email is already exist."})
        }else{
            newUser.save(function(err){
                if(err){
                    res.json({status:false, msg:"Unable to signup. Please try after sometime."})
                }else{
                    User.findOne({email: req.body.email}, function(err, users){
                        var forToken = {_id: users._id, name: users.name, password: users.password, email: users.email, phone: users.phone, username: users.username }
                        var token = jwt.sign(forToken, config.secret);
                        res.json({status:true, token:'Bearer '+token, _id:users._id, name:users.name, email: users.email, phone:users.phone});
                    });
                } 
            })
        }
    })
}


user.login = function(req, res){
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body);
    console.log("Hello"); 
    User.findOne({email: email}, function(err, us){
        if(err)
            throw err;
         
        if(!us){
            res.json({status:false, msg:"Username or password is incorrect."});
        }else{
            us.comparePassword(password, function(err, isMatch){

                if(isMatch && !err){
                    var forToken = {_id: us._id, name: us.name, password: us.password, email: us.email, phone: us.phone, username: us.username }
                    var token = jwt.sign(forToken, config.secret);
                    res.json({status:true, token:'Bearer '+token, _id:us._id, name:us.name, email: us.email,  phone: us.phone,});
                }else{
                    res.json({status:false, msg:"Username or password is incorrect."});
                }
            });
        }

    });
}


module.exports  = user;