var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    //留言
    author:{
        type:Schema.Types.ObjectId
    },
    //内容
    content:{
        type:String
    },
    //留言id
    postId:{
        type:Schema.Types.ObjectId
    },
    date:{
        type:String
    }
});

var commentModel = mongoose.model('comment',commentSchema);

module.exports = commentModel;


    // 创建一个留言
module.exports.create= function create(comment,callback) {
        return comment.save(callback);
    };
    // 通过用户 id 和留言 id 删除一个留言
module.exports.delCommentById=function delCommentById(commentId, author) {
        return commentModel.remove({ author: author, _id: commentId }).exec();
    };

// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
module.exports.getComments=function getComments(postId) {
        return commentModel
            .find({ postId: postId })
            .populate({ path: 'author', model: 'user' })
            .sort({ _id: 1 })
            .exec();
    };

// 通过文章 id 获取该文章下留言数
module.exports.getCommentsCount=function getCommentsCount(postId) {
        return Comment.count({ postId: postId }).exec();
    };
