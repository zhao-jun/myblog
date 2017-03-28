var express = require('express');
var router = express.Router();
var moment = require('moment');

var pageModel = require('../models/page');
var checkLogin = require('../middlewares/check').checkLogin;


// POST /publish 发表一篇文章
router.post('/', checkLogin, function(req, res, next) {
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    // 校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!content.length) {
            throw new Error('请填写内容');
        }
    } catch (e) {
        return res.json({ code: 1009, message: e.message });
    }

    var page = {
        author: author,
        title: title,
        content: content,
        pv: 0,
        commentsCount:0,
        date:moment().format('YYYY-MM-DD HH:mm')
    };

    var pageEntity = new pageModel(page);
    pageModel.create(pageEntity,function (error,page) {
        return res.json({ code: 1000, message: "发布成功" });
    });
});

/*// GET /publish/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function(req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;
    console.log(postId);
    pageModel.getRawPostById(postId)
        .then(function (post) {
            if (!post) {
                throw new Error('该文章不存在');
            }
            if (author.toString() !== post.author._id.toString()) {
                throw new Error('权限不足');
            }
            res.render('edit', {
                post: post
            });
        })
        .catch(next);
});*/



// GET /publish/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function(req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;

    pageModel.delPostById(postId, author)
        .then(function () {
            req.flash('success', '删除文章成功');
            // 删除成功后跳转到主页
            res.redirect('/page');
        })
        .catch(next);
});



module.exports = router;