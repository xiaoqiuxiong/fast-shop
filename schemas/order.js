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
		ref: 'Member'
	},
	// 商品总数
	amount: {
		type: Number,
		default: 0
	},
	// 商品列表
	goods: {
		type: Array
	},
	// 退货商品列表
	return_goods: {
		type: Array
	},
	// 配送费
	freight: {
		type: Number,
		default: 0
	},
	// 订单留言
	leave_word: {
		type: String
	},
	// 退货留言
	return_leave_word: {
		type: String
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
	// 物流单号
	tracking_number: {
		type: String
	},
	// 收货地址
	address: {
		type: Schema.Types.ObjectId,
		ref: 'Address'
	},
	// 支付方式(微信 1 、 支付宝 2 、 银联 3 、 其他 4 )
	pay_type: {
		type: Number
	},
	// 支付时间
	pay_time: {
		type: Date
	},
	// 发货时间
	shipments_time: {
		type: Date
	}
}))