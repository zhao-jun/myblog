module.exports = function (app) {
    // app.get('/', function (req, res) {
    //     res.redirect('/blog');
    // });
    
    app.use('/blog', require('./blog'));
    app.use('/reg', require('./reg'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
};