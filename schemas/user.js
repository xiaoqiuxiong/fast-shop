/*用户表*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 用户的表结构
module.exports = mongoose.model('User', new Schema({
    id:{
        type: String,
        default: '0'
    },
    // 添加时间
    addtime: {
        type: Date,
        default: Date.now
    },
    // 手机号
    phone: String,
    // 昵称
    nickname: {
        type: String,
        default: '无名氏'
    },
    // 密码
    password: {
        type: String,
        require: true
    },
    // cip
    cip: String,
    // cname
    cname: String,
    // 是否超级管理员
    isSuper: {
        type: Boolean,
        default: false
    }
}));