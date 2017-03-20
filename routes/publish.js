var express = require('express');
var router = express.Router();
var moment = require('moment');

var blogModel = require('../models/blog');
var commentModel = require('../models/comment');
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
        req.flash('error', e.message);
        return res.redirect('back');
    }

    var blog = {
        author: author,
        title: title,
        content: content,
        pv: 0,
        date:moment().format('LLL')
    };

    var blogEntity = new blogModel(blog);
    blogModel.create(blogEntity,function (error,blog) {

        return res.json({ code: 1000, message: "发布成功" });
        // 发表成功后跳转到该文章页
        // res.redirect(`/blog/${blog._id}`);
    });

});

// GET /publish/:publishId 单独一篇的文章页
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

            res.render('post', {
                post: blog,
                comments:comments
            });
        })
        .catch(next);
});

// GET /blog/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function(req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;
    console.log(postId);
    blogModel.getRawPostById(postId)
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
});

// POST /blog/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function(req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    blogModel.updatePostById(postId, author, { title: title, content: content })
        .then(function () {
            req.flash('success', '编辑文章成功');
            // 编辑成功后跳转到上一页
            res.redirect(`/blog/${postId}`);
        })
        .catch(next);
});

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function(req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;

    blogModel.delPostById(postId, author)
        .then(function () {
            req.flash('success', '删除文章成功');
            // 删除成功后跳转到主页
            res.redirect('/blog');
        })
        .catch(next);
});


// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function(req, res, next) {
    var author = req.session.user._id;
    var postId = req.params.postId;
    var content = req.fields.content;
    var comment = {
        author: author,
        postId: postId,
        content: content,
        date:moment().format('LLL')
    };
    var commentEntity = new commentModel(comment);
    commentModel.create(commentEntity,function (error) {
            req.flash('success', '留言成功');
            // 留言成功后跳转到上一页
            res.redirect('back');
        })

});

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
    var commentId = req.params.commentId;
    var author = req.session.user._id;

    commentModel.delCommentById(commentId, author)
        .then(function () {
            req.flash('success', '删除留言成功');
            // 删除成功后跳转到上一页
            res.redirect('back');
        })
        .catch(next);
});

module.exports = router;