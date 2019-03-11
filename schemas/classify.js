/*
* @Author: Administrator
* @Date:   2019-03-10 17:29:06
* @Last Modified by:   Administrator
* @Last Modified time: 2019-03-10 21:22:38
*/

// 产品分类
const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Classify', new Schema({
	// 添加时间
	addtime: {
		type: Date,
		default: new Date()
	},
	// 排序
	sort: {
		type: Number
	},
	// 名称
	name: {
		type: String
	},
	// 是否启用
	isUse: {
		type: Boolean,
		default: true
	}
}))