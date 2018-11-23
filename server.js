var express = require('express');
var app = express();
var appRoute = require('./app/index');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
<<<<<<< HEAD
app.use(cookieParser());
=======
>>>>>>> bceb1db99235a47ea8f5b27dfd8db1480db2acd1
mongoose.connect('', {useNewUrlParser: true}, function (err){
    if(err){
        
    }else{
        console.log('DB connected succesfully.');
    }
})

app.get('/', function(req, res){
    res.json({msg:"Setup successsdfsdsdfsdfsdfsdully."})
})
app.use(cors());
app.use(passport.initialize());
appRoute(app);

app.listen(4200, function(){
    console.log('Server running on 4200'); 
}) 