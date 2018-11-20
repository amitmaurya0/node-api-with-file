var express = require('express');
var app = express();
var appRoute = require('./app/index');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
mongoose.connect('mongodb://test_user:user_123@ds241723.mlab.com:41723/test_1', {useNewUrlParser: true}, function (err){
    if(err){
        console.log('unable to connect mongodb', err);
        
    }else{
        console.log('DB connected succesfully.');
    }
})

app.get('/', function(req, res){
    res.json({msg:"Setup successsdfsdsdfsdfsdfsdully."})
})

appRoute(app);

app.listen(3000, function(){
    console.log('Server running on 3000');
})