/*商品分类表*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model('Classm', new Schema({
  // 添加时间
  addtime: {
    type: Date,
    default: new Date()
  },
  // 名称
  name: String
}));