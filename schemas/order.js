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
	// 退货商品列表
	return_goods: {
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
	// 退货留言
	return_leave_word: {
		type: String,
		default: ''
	},
	// 总价
	total_price: {
		type: Number,
		default: 0
	},
	// 退货总价
	return_total_price: {
		type: Number,
		default: 0
	},
	// 订单类型(购买 1 、 退款 2)
	type: {
		type: Number,
		default: 1
	},
	// 订单状态
	// 已关闭：0
	// 待支付：1
	// 待发货：2 
	// 待确认收货：3
	// 待退货：4
	// 待退款：5
	// 已退款：6
	// 已完成：10
	state: {
		type: Number,
		default: 0
	},
	// 收货地址
	address: {
		type: Schema.Types.ObjectId,
		ref: 'Address'
	}
}))