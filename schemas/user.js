/*用户表*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 用户的表结构
module.exports = mongoose.model('User', new Schema({
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
    default: '暂无'
  },
  // 密码
  password: {
    type: String,
    require: true
  }
}));