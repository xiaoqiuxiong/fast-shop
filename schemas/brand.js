/*
* @Author: Administrator
* @Date:   2019-03-09 22:49:53
* @Last Modified by:   Administrator
* @Last Modified time: 2019-03-09 23:09:29
*/
/*產品品牌表*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Brand', new Schema({
	// 添加时间
	addtime: {
		type: Date,
		default: new Date()
	},
	// logo
	logo: {
		type: String,
		default: ''
	},
	// 品牌名稱
	name: {
		type: String,
		default: ''
	},
	// 国家
	isChina: {
		type: Boolean,
		default: true
	},
	// 描述
	describe: {
		type: String,
		default: '暂无相关品牌描述'
	}
}))