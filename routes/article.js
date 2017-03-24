var express = require('express');
var router = express.Router();
var moment = require('moment');
var blogModel = require('../models/blog');
var commentModel = require('../models/comment');
var checkLogin = require('../middlewares/check').checkLogin;


// GET /a/:id 单独一篇的文章页
router.get('/:postId', function(req, res, next) {
    var blogId = req.params.postId;

    Promise.all([
        blogModel.getBlogById(blogId),// 获取文章信息
        commentModel.getComments(blogId),// 获取该文章所有留言
        blogModel.incPv(blogId)// pv 加 1
    ])
        .then(function (result) {
            var blog = result[0];
            var comments = result[1];
            if (!blog) {
                throw new Error('该文章不存在');
            }
            res.json({article: blog, comments:comments});
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
        blogModel.incCommentsCount(postId);
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
            blogModel.decCommentsCount(postId);
            res.json({ code: 1000, message: "留言删除成功" });
        })
        .catch(next);
});

module.exports = router;