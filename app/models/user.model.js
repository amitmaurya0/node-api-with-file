var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:{ 
        first: String, 
        last: String
    },
    email: { required: true, type: String },
    mobile: String,
    country: String,
    password: { required: true, type: String },
    timestamp: { type: Date, default: Date.now }
}) 

module.exports = mongoose.model('users', userSchema); 