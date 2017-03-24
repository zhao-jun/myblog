// var path = require('path');
module.exports = function (app) {
    // app.get('/', function (req, res) {
    //     res.redirect('/blog');
    // });
/*    app.get('/', function (request, response){
        response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
    });*/

    app.use('/page', require('./page'));
    app.use('/publish', require('./publish'));
    app.use('/reg', require('./reg'));
    app.use('/login', require('./login'));
    app.use('/loginOut', require('./loginOut'));
    app.use('/getUserInfo', require('./getUserInfo'));
    app.use('/a',require('./article'));
};