var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentModel = require('./comment');

var pageSchema = new Schema({
    //作者
    author:{
        type:Schema.Types.ObjectId
    },
    name:{
        type:String
    },
    //标题
    title:{
        type:String
    },
    //内容
    content: {
        type:String
    },
    //阅读数
    pv: {
        type:Number
    },
    //留言数
    commentsCount:{
        type:Number
    },
    date:{
        type:String
    }
});

//作者，时间排序
pageSchema.index({author:1,_id:-1});


var pageModel = mongoose.model('page',pageSchema);

module.exports = pageModel;

module.exports.create = function (newPage,callback) {
    return newPage.save(callback);
};

//按创建时间降序获取所有用户文章或者某个特定用户的所有文章
module.exports.getAll = function (author, callback) {
    var query={};
    if(author){
        query.author = author;
    }

    return pageModel.find(query)
        .populate({ path: 'author', model: 'user' })
        .sort({ _id: -1 }).exec(callback);
};

//获取分页文章
module.exports.getPage = function (p,name, callback) {
    var query={};
    if(name){
        query.name = name;
    }
    return pageModel.find(query)
        //防止密码发送
        .populate({ path: 'author',model: 'user',select: 'name' })
        .sort({ _id: -1 })
        //转换成数字
        .skip(p*5-5)
        .limit(5)
        .exec(callback);
};


//获取指定文章
module.exports.getPageById = function (pageId, callback) {
    return pageModel
        .findOne({_id:pageId})
        .populate({ path: 'author', model: 'user',select: 'name' })
        .exec(callback);
};

// 通过文章 id 给 pv 加 1
module.exports.incPv = function (pageId, callback) {
    return pageModel
        .update({ _id: pageId }, { $inc: { pv: 1 } })
        .exec(callback);
};

// 通过文章 id 给 commentsCount 加 1
module.exports.incCommentsCount = function (pageId, callback) {
    return pageModel
        .update({ _id: pageId }, { $inc: { commentsCount: 1 } })
        .exec(callback);
};

// 通过文章 id 给 commentsCount 减 1
module.exports.decCommentsCount = function (pageId, callback) {
    return pageModel
        .update({ _id: pageId }, { $inc: { commentsCount: -1 } })
        .exec(callback);
};


// 通过文章 id 获取一篇原生文章（编辑文章）
module.exports.getRawPostById= function (postId, callback) {
    return pageModel
        .findOne({ _id: postId })
        .populate({ path: 'author', model: 'user' })
        .exec(callback);
};

// 通过用户 id 和文章 id 更新一篇文章
module.exports.updatePostById=function (postId, author, data) {
    return pageModel.update({ author: author, _id: postId }, { $set: data }).exec();
};

// 通过用户 id 和文章 id 删除一篇文章
module.exports.delPostById= function (postId, author) {
    return pageModel.remove({ author: author, _id: postId }).exec()
        .then(function (res) {
            // 文章删除后，再删除该文章下的所有留言
            if (res.result.ok && res.result.n > 0) {
                return commentModel.delCommentsByPostId(postId);
            }
        });
};