module.exports = function (app) {
    // app.get('/', function (req, res) {
    //     res.redirect('/blog');
    // });
    
    app.use('/publish', require('./publish'));
    app.use('/reg', require('./reg'));
    app.use('/login', require('./login'));
    app.use('/loginOut', require('./loginOut'));
    app.use('/getUserInfo', require('./getUserInfo'));
};