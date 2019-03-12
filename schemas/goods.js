/*商品表*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Goods', new Schema({
	id: {
		type: String,
		default: '0'
	},
	// 添加时间
	addtime: {
		type: Date,
		default: new Date()
	},
	// 分类
	classify: {
		type: Schema.Types.ObjectId, 
		ref: 'Classify'
	},
	// 品牌
	brand: {
		type: Schema.Types.ObjectId, 
		ref: 'Brand'
	},
	// 商品标题
	title: {
		type: String,
		default: ''
	},
	// 商品小标题
	min_title: {
		type: String,
		default: ''
	},
	// 描述
	introduce: {
		type: String,
		default: ''
	},
	// 图片
	img: {
		type: Array,
		default: []
	},
	// 价格
	price: {
		type: Number,
		default: 0
	},
	// 成本价
	cost: {
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