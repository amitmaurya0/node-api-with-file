var jwt = require('jsonwebtoken');
var config = require('./../../../config/database');

module.exports = function(token){
		var a = token.split(" ");
		var t = a[1];
	var info = jwt.verify(t, config.secret, function(err, payload){
		if(err)
			return {success:false};
		else
			return payload;
	});

	return info;
};