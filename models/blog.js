var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    //作者
    author:{
        type:Schema.Types.ObjectId
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
    }
});

//作者，时间排序
blogSchema.index({author:1,_id:-1});




var blogModel = mongoose.model('blog',blogSchema);

module.exports = blogModel;

module.exports.create = function (newBlog,callback) {
    newBlog.save(callback);
};

//按创建时间降序获取所有用户文章或者某个特定用户的所有文章
module.exports.getBlog = function (author, callback) {
    var query={};
    if(author){
        query.author=author;
    }
    blogModel.find(query)
        .populate({ path: 'author', model: 'user' })
        .sort({ _id: -1 }).exec(callback);
};

module.exports.getBlogById = function (blogId, callback) {
    return blogModel
        .findOne({_id:blogId})
        .populate({ path: 'author', model: 'user' })
        .exec(callback);
};

// 通过文章 id 给 pv 加 1
module.exports.incPv = function (blogId, callback) {
    return blogModel
        .update({ _id: blogId }, { $inc: { pv: 1 } })
        .exec(callback);
};


    // 通过文章 id 获取一篇原生文章（编辑文章）
module.exports.getRawPostById= function getRawPostById(postId, callback) {
    return blogModel
        .findOne({ _id: postId })
        .populate({ path: 'author', model: 'user' })
        .exec(callback);
};

// 通过用户 id 和文章 id 更新一篇文章
module.exports.updatePostById=function updatePostById(postId, author, data) {
    return blogModel.update({ author: author, _id: postId }, { $set: data }).exec();
};

// 通过用户 id 和文章 id 删除一篇文章
module.exports.delPostById= function delPostById(postId, author) {
    return blogModel.remove({ author: author, _id: postId }).exec();
};
