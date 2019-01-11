/*商品表*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Good', new Schema({
	// 添加时间
	addtime: {
		type: Date,
		default: new Date()
	},
	// 分类id
	cid: {
		type: Schema.Types.ObjectId, 
		ref: 'Classm'
	},
	// 商品标题
	title: {
		type: String,
		default: ''
	},
	// 商品编码
	pro_no: {
		type: String,
		default: ''
	},
	// 关键词
	keywords: {
		type: Array,
		default: []
	},
	// 描述
	desc: {
		type: String,
		default: ''
	},
	// 图片
	img: {
		type: Array,
		default: []
	},
	// 新价格
	price: {
		type: Number,
		default: 0
	},
	// 成本价
	constm: {
		type: Number,
		default: 0
	},
	// 原价
	orininal_price: {
		type: Number,
		default: 0
	},
	// 点击量
	pv: {
		type: Number,
		default: 0
	},
	// 销量
	sell: {
		type: Number,
		default: 0
	}
}))