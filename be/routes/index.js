var path = require('path');
module.exports = function (app) {
/*    app.get('/', function (req, res) {
        res.redirect('/blog');
    });*/

/*    app.get('*', function (request, response){
        response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
    });*/

    app.use('/api/page', require('./page'));
    app.use('/api/publish', require('./publish'));
    app.use('/api/create', require('./create'));
    app.use('/api/blog', require('./blog'));
    app.use('/api/reg', require('./reg'));
    app.use('/api/login', require('./login'));
    app.use('/api/loginOut', require('./loginOut'));
    app.use('/api/getUserInfo', require('./getUserInfo'));
    app.use('/api/a',require('./article'));

};