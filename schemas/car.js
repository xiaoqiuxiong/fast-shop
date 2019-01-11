/*购物车表*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Car', new Schema({
	// 添加时间
	addtime: {
		type: Date,
		default: new Date()
	},
	// 买家id
	buyid: {
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},
	// 商品总数
	amount: {
		type: Number,
		default: 0
	},
	// 商品列表
	goods: {
		type: Array,
		default: []
	},
	// 价格
	price: {
		type: Number,
		default: 0
	}
}))