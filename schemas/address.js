/*地址表*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model('Address', new Schema({
  id: {
    type: String,
    default: '0'
  },
  // 添加时间
  addtime: {
    type: Date,
    default: new Date()
  },
  // 用户ID
  user:{
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  },
  // 省份
  province: String,
  // 城市
  city: String,
  // 镇县
  towns: String,
  // 具体地址
  detail: String,
  // 姓名
  name: String,
  // 手机号
  phone: String,
  // 是否常用
  isCommon: {
    type: Boolean,
    default: false
  },
}));