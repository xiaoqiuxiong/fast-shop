/*订单表*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Order', new Schema({
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
	// 配送费
	freight: {
		type: Number,
		default: 0
	},
	// 订单留言
	leave_word: {
		type: String,
		default: ''
	},
	// 价格
	price: {
		type: Number,
		default: 0
	},
	// 总价
	total_price: {
		type: Number,
		default: 0
	},
	// 订单类型
	type: {
		type: Number,
		default: 1
	},
	// 订单状态
	state: {
		type: Number,
		default: 0
	},
	// 收货地址id
	address_id: {
		type: Schema.Types.ObjectId,
		ref: 'Address'
	}
}))