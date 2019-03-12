/*
 * @Author: Administrator
 * @Date:   2019-03-11 21:33:16
 * @Last Modified by:   Administrator
 * @Last Modified time: 2019-03-11 22:45:39
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Ids', new Schema({
    id: { 
    	type: Number, 
    	default: 1 
    },
    goods_num: {
        type: Number,
        default: 0
    },
    brand_num: {
        type: Number,
        default: 0
    },
    classify_num: {
        type: Number,
        default: 0
    },
    user_num: {
        type: Number,
        default: 0
    }
}))