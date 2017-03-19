var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;


// POST /login 用户登录
router.post('/', function(req, res, next) {
    var name = req.fields.userName;
    var password = req.fields.password;

    UserModel.getUserByUsername(name,function (err, user) {
        if (err) throw err;
        if (!user) {
                return res.json({ code: 1002, message: "用户名不存在" });
            }
            // 检查密码是否匹配
            if (sha1(password) !== user.password) {
                return res.json({ code: 1001, message: "密码错误" });
            }
            // req.flash('success', '登录成功');
            // 用户信息写入 session
            delete user.password;
            req.session.user = user;
            res.json({ code: 1000, message: "登录成功", name: name})
        })
});

module.exports = router;