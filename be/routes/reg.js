var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');

// POST /reg 用户注册
router.post('/', function(req, res, next) {
    // return res.json({'success': 'connected'});
    
    var name = req.fields.userName;
    // var gender = req.fields.gender;
    // var bio = req.fields.bio;
    // var avatar = req.files.avatar.path.split(path.sep).pop();
    var password = req.fields.password;
    var repassword = req.fields.repassword;

    //后端验证
    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在 1-10 个字符');
        }
/*        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('性别只能是 m、f 或 x');
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符');
        }
        if (!req.files.avatar.name) {
            throw new Error('缺少头像');
        }*/
        if (password.length < 6) {
            throw new Error('密码长度为6-16位数');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    }catch (e) {
        // 注册失败，异步删除上传的头像
        // fs.unlink(req.files.avatar.path);
/*        req.flash('error', e.message);
        return res.redirect('/signup');*/
        return res.json({ code: 1009, messgage: e.message });
    }
    
    // 明文密码加密
    password = sha1(password);

    // 待写入数据库的用户信息
    var user = {
        name: name,
        password: password
/*        gender: gender,
        bio: bio,
        avatar: avatar*/
    };

    var userEntity = new UserModel(user);

    UserModel.create(userEntity,function (error) {
        if (error && error.message.match('E11000 duplicate key')) {
            // req.flash('error', '用户名已被占用');
            return res.json({ code: 1002, message: '用户名已存在' });
        }
        console.log('成功');
        return res.json({ code: 1000, message: '注册成功' });
        // 跳转到首页
        // res.redirect('/blog');
    });
});

module.exports = router;