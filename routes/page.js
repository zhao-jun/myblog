var express = require('express');
var router = express.Router();

var pageModel = require('../models/page');
var commentModel = require('../models/comment');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /page 文章页标签
// GET /page?author=xxx
// GET /page?p=xxx
router.get('/', function(req, res, next) {
    // var author = req.query.author;
    var p = req.query.p-0;
    p = p?p:1;
    var num;
    //统计总数
    pageModel.count(function (err, count) {
        if (err) return console.log(err);
        num = count;
    });

    pageModel.getPage(p,function (err, page) {
        // if (err) return console.log(err);
        var limitNum = Math.ceil(num/5);
        res.json({page: page,num:num,limitNum:limitNum,p:p});
    });
    return;
});

module.exports = router;