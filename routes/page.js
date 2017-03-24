var express = require('express');
var router = express.Router();
var moment = require('moment');

var blogModel = require('../models/blog');
var commentModel = require('../models/comment');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /blog 文章页标签
// GET /page?author=xxx
// GET /page?p=xxx
router.get('/', function(req, res, next) {
    var author = req.query.author;
    var p = req.query.p-0;
    p = p?p:1;
    var num;
    console.log(p);
    //统计总数
    blogModel.count(function (err, count) {
        num = count;
    });
    blogModel.getPage(p,function (err, blog) {
        var limitNum = Math.ceil(num/5);
        res.json({page: blog,num:num,limitNum:limitNum,p:p});
    })

});

module.exports = router;