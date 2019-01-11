/*日志表*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 日志的表结构
module.exports = mongoose.model('Log', new Schema({
    // 添加时间
    addtime: {
        type: Date,
        default: Date.now
    },
    // 用户信息
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // 操作
    remark: {
        type: String,
        default: '暂无'
    },
    // ip
    cip: {
        type: String,
        default: '暂无'
    },
    // 地址
    cname: {
        type: String,
        default: '暂无'
    },
    // 状态
    status: {
        type: Boolean
    },
}));