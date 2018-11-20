var User = require('./../../models/user.model');
var appConfig = require('./../../shared/config');

var user = {};








user.list = function(req, res){
    User.find({}, 'name email').exec(function(err, data){
        if(err)
            res.json({status:false, msg: "Unable to fetch the data"})
        else
            res.json({status:true, msg:"Success", data})
    })
}

user.create = function(req, res){

    //var a = upload.single('image');

    console.log(appConfig.userImageDestination+"/"+req.file.filename);
    
    res.json({status:false, msg:"img upload."})
    return;
    var input = req.body;

    var newUser = new User({
        name: {
            first: input.first_name,
            last: input.last_name
        },
        email: input.email,
        mobile: input.mobile,
        country: input.country,
        password: input.password
    })

    User.findOne({email: input.email}, function(err, data){
        if(data){
            res.json({status:false, msg: "This email is already exist."})
        }else{
            newUser.save(function(err){
                if(err){
                    res.json({status:false, msg:"Unable to signup. Please try after sometime."})
                }else{
                    res.json({status:true, msg:"Signup successfuly."})
                } 
            })
        }
    })
}

module.exports  = user;