var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');
var mongoose = require('mongoose');

//Warning: Possible EventEmitter memory leak detected. 11 end listeners added. Use emitter.setMaxListeners() to increase limit
require('events').EventEmitter.prototype._maxListeners = 100;

var db = mongoose.connect(config.mongodb);

mongoose.Promise = global.Promise;
db.connection.on('connected', function () {
    console.log('Mongoose connection success');
});
db.connection.on('error', function (err) {
    console.log('connection error');
});

var app = express();


//设置跨域访问
/*app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Content-Type=application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true); //支持跨域传cookie
    next();
});*/


// 设置静态文件目录
app.use(express.static(path.join(__dirname + '/public')));

/*// 设置模板目录
app.set('views', path.join(__dirname, 'public'));
// 设置模板引擎为 html
app.set('view engine', 'html');*/

// session 中间件
sessionMiddleware =session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,// 强制更新 session
    saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        // url: config.mongodb,// mongodb 地址
        mongooseConnection: mongoose.connection
    })
});

app.use(sessionMiddleware);
// flash 中间件，用来显示通知
app.use(flash());

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
    keepExtensions: true// 保留后缀
}));

// 设置模板全局常量
// app.locals.blog = {
//     title: pkg.name,
//     description: pkg.description
// };

// 添加模板必需的三个变量
// app.use(function (req, res, next) {
//     res.locals.user = req.session.user;
//     res.locals.success = req.flash('success').toString();
//     res.locals.error = req.flash('error').toString();
//     next();
// });

// 路由
routes(app);

/*app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
 });*/
app.disable('x-powered-by');




// 监听端口，启动程序
var server = app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
});

//express连接修改
// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);

var io = require('socket.io').listen(server);

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

// 在线用户
var onlineUsers = [];
// 在线用户人数
var onlineCount = 0;


//WebSocket连接监听
io.on('connection',socket=>{
    // console.log('a user connected');
    //验证用户是否存在
/*    if(!socket.request.session.user) {
        socket.emit('redirect')
    }*/
    // 监听客户端的登陆
    socket.on('login', function(obj){

        // 如果没有这个用户，那么在线人数+1，将其添加进在线用户
        if (obj.name && onlineUsers.indexOf(obj.name) == -1) {
            onlineUsers.push(obj.name);
            onlineCount++;
            //切换路由不重复显示登录
            //客户端移除也可
            // 向客户端发送登陆事件，同时发送在线用户、在线人数以及登陆用户
            io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj,name:'system',type:'in'});
        }

        // console.log(io.sockets.sockets);
        return;
        // console.log(obj.name+'加入了群聊');
    });


    // 监听客户端发送的信息
    socket.on('message', function(obj){
        // console.log(io);
        io.emit('message', obj);
        // console.log(obj.name+"说:"+ obj.message + obj.time);

    });

    //切换用户
    socket.on('changeUser',function () {
        let username;
        if(socket.request.session.user){
            username = socket.request.session.user.name;
        }
        // console.log(username);
        // 如果有这个用户
        if(onlineUsers.indexOf(username) != -1) {
            var obj = {name:username};
            // console.log(obj);
            // 删掉这个用户，在线人数-1
            onlineUsers=onlineUsers.filter(item => item!= username);
            onlineCount--;

            // 向客户端发送登出事件，同时发送在线用户、在线人数以及登出用户
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj,name:'system',type:'out'});
            // console.log(obj.name+'退出了群聊');
        }
    });

    // 监听客户端的断开连接
    socket.on('disconnect', function() {
        let username;
        if(socket.request.session.user){
            username = socket.request.session.user.name;
        }
        // console.log(username);
        // 如果有这个用户
        if(onlineUsers.indexOf(username) != -1) {
            var obj = {name:username};
            // console.log(obj);
            // 删掉这个用户，在线人数-1
            onlineUsers=onlineUsers.filter(item => item!= username);
            onlineCount--;

            // 向客户端发送登出事件，同时发送在线用户、在线人数以及登出用户
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj,name:'system',type:'out'});
            // console.log(obj.name+'退出了群聊');
        }
    })
});