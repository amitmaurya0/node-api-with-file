var modules = require('./modules/index');

module.exports = function(app){
    app.use('/api/v1', modules);
}