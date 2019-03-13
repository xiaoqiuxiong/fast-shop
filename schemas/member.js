/*会员表*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 表结构
module.exports = mongoose.model('Member', new Schema({
    id:{
        type: String,
        default: '0'
    },
    // 添加时间
    addtime: {
        type: Date,
        default: Date.now
    },
    // 头像
    img: {
        type: String
    },
    // 昵称
    nickname: {
        type: String,
        default: 'FAST-SHOP'
    },
    // 姓名
    name: {
        type: String,
        default: ''
    },
    // 性别 (1: 男， 2：女)
    sex: {
        type: Number,
        default: 0
    },
    // 省份
    provinces: {
        type: String
    },
    // 城市
    city: {
        type: String
    },
    // 手机号
    phone: String,
    // 密码
    password: {
        type: String,
        require: true
    }
}));