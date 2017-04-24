var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    //昵称
    name:{
        type:String,
        unique: true
    },
    //密码
    password:{
        type:String
    },
    //性别
    gender: {
        type:String,
        enum: ['m', 'f', 'x']
    },
    //头像
    avatar: {
        type:String
    },
    //个人介绍
    bio:{
        type:String
    }
});





var UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;

//注册用户
module.exports.create = function (newUser,callback) {
    return newUser.save(callback);
};

//登录查找用户
module.exports.getUserByUsername = function (name, callback) {
    var query = {name: name};
    return UserModel.findOne(query,callback);
};