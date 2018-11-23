var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt; 

var User = require('./../app/models/user.model');
var config = require('./database');

module.exports = function(passport){
	
	 var opts = {};
  	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = config.secret;
	
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

		User.findOne({_id:jwt_payload._id}, function(err, user){
			if(err)
				return done(err, false);
			if(user){
				
				return done(null, user);
			}
			else
				return done(null, false);
		});

	}));
}