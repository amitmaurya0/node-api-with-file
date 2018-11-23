var route = require('express').Router();
var user = require('./user');
var multer = require('multer');
var appConfig = require('./../../shared/config');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, appConfig.userImageDestination)
    },
    filename: (req, file, cb) => {
        var originalName = file.originalname;
        var sp = originalName.split('.');
        var extension = sp[sp.length-1];
        cb(null, file.fieldname + '-' + Date.now()+"."+extension)
       
    }
});

var upload = multer({storage: storage});

//route.get('/list', user.list);
route.post('/signup', upload.single('image'), user.create);
route.post('/login', user.login);


module.exports = route;