/*地址表*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model('Address', new Schema({
  // 添加时间
  addtime: {
    type: Date,
    default: new Date()
  },
  // 用户ID
  user_id:{
  	type: Schema.Types.ObjectId,
  	ref: 'user'
  },
  // 省份
  province: String,
  // 城市
  city: String,
  // 镇县
  towns: String,
  // 具体地址
  address: String,
  // 姓名
  name: String,
  // 手机号
  phone: String
}));