var express = require('express');
var app = express();
var appRoute = require('./app/index');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var config = require('./config/database');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static('public'))
mongoose.connect(config.mongoUrl, {useNewUrlParser: true}, function (err){
    if(err){
        
        console.log('Unable to connect the database.');
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