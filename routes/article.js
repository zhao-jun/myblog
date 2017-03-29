var express = require('express');
var router = express.Router();
var moment = require('moment');
var pageModel = require('../models/page');
var commentModel = require('../models/comment');
var checkLogin = require('../middlewares/check').checkLogin;


// GET /a/:id 单独一篇的文章页
router.get('/:postId', function(req, res, next) {
    var pageId = req.params.postId;

    Promise.all([
        pageModel.getPageById(pageId),// 获取文章信息
        commentModel.getComments(pageId),// 获取该文章所有留言
        pageModel.incPv(pageId)// pv 加 1
    ])
    .then(function (result) {
        var page = result[0];
        var comments = result[1];
        if (!page) {
            console.log('该文章不存在');
        }
        res.json({article: page, comments:comments});
    })
});

// POST /a/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function(req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    pageModel.updatePostById(postId, author, { title: title, content: content })
        .then(function () {
            return res.json({ code: 1000, message: "更新成功" });
        })
        .catch(next);
});

// DELETE /a/:postId 删除一篇文章
router.delete('/:postId/', checkLogin, function(req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;

    pageModel.delPostById(postId, author)
        .then(function () {
            return res.json({ code: 1000, message: "删除成功" });
        })
        .catch(next);
});

// POST /a/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function(req, res, next) {
    var author = req.session.user._id;
    var postId = req.params.postId;
    var content = req.fields.content;

    var comment = {
        author: author,
        postId: postId,
        content: content,
        date:moment().format('YYYY-MM-DD HH:mm')
    };
    var commentEntity = new commentModel(comment);
    commentModel.create(commentEntity,function (error) {
        pageModel.incCommentsCount(postId);
        res.json({ code: 1000, message: "留言成功" });
    })
});

// DELETE /a/:postId/comment/:commentId 删除一条留言
router.delete('/:postId/comment/:commentId', checkLogin, function(req, res, next) {
    var commentId = req.params.commentId;
    var author = req.session.user._id;
    var postId = req.params.postId;

    commentModel.delCommentById(commentId, author)
        .then(function () {
            pageModel.decCommentsCount(postId);
            res.json({ code: 1000, message: "留言删除成功" });
        })
        .catch(next);
});

module.exports = router;