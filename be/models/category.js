var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    category:{
        type:String
    },
    count:{
        type:Number
    }
});



var categoryModel = mongoose.model('category',categorySchema);

module.exports = categoryModel;

module.exports.create = function (categoryModel,callback) {
    return categoryModel.save(callback);
};


// 通过分类 给 数量 加 1
module.exports.incCount = function (category, callback) {
    return categoryModel
        .update({ category: category }, { $inc: { count: 1 } })
        .exec(callback);
};


// 通过文章 id 给 commentsCount 减 1
module.exports.decCount = function (category, callback) {
    return categoryModel
        .update({ category: category }, { $inc: { count: -1 } })
        .exec(callback);
};