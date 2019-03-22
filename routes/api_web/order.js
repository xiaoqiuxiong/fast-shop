const router = require('koa-router')()
const Order = require('../../schemas/order')
const mongoose = require('mongoose');

// 判断方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return false;
    } else {
        return true;
    }
}

router.prefix('/api_web/order')

// 列表
router.get('/', async ctx => {
    let page = Number(ctx.query.page || 1)
    const limit = Number(ctx.query.limit || 10)
    let pages = 0
    const searchData = ctx.query.searchData
    //不区分大小写
    const reg = new RegExp(searchData, 'i')
    try {
        const total = await Order.count({
            $or: [
                { id: { $regex: reg } },
                { title: { $regex: reg } }
            ]
        })
        if (!isEmpty(total)) {
            const res = {
                code: -1,
                msg: '暂无数据'
            }
            ctx.body = res
            return
        }
        pages = Math.ceil(total / limit)
        page = Math.min(page, pages)
        page = Math.max(page, 1)
        const skip = (page - 1) * limit
        let orders = await Order.find({
            $or: [
                { id: ({ $regex: reg }) },
                { title: { $regex: reg } }
            ]
        }).sort({ _id: 1 }).limit(limit).skip(skip)
        const res = {
            code: 0,
            msg: '',
            count: total,
            pages: pages,
            data: orders
        }
        ctx.body = res
    } catch (err) {
        console.log(err)
        const res = {
            code: -1,
            msg: 'sorry，数据请求失败，请刷新页面重新尝试'
        }
        ctx.body = res
    }
});

// 增加
router.get('/add', async (ctx, next) => {
    // 卖家id
    const buyid = ctx.query.buyid
    // 商品总数
    const amount = 0
    // 总价
    let total_price = 0
    // 购买商品
    let goods = JSON.parse(ctx.query.goods) || []
    goods = goods.map(async (item, key, ary) => {
        const goodsPrice = await Goods.findOne({ _id: item.id }).price
        const goodsSubtotal = parseFloat(goodsPrice) * item.count.toFixed(2)
        total_price += goodsSubtotal
        return {
            id: item.id,
            count: item.count,
            subtotal: goodsSubtotal
        }
    })
    // 运费
    const freight = ctx.query.freight
    // 购买备注
    const leave_word = ctx.query.leave_word
    // 收货地址
    const address = ctx.query.address
    // 订单状态
    const state = 1
    try {
        let doc = await new Order({
            buyid,
            amount,
            goods,
            freight,
            leave_word,
            total_price,
            address,
            state
        }).save()
        if (isEmpty(doc)) {
            ctx.body = {
                code: 0,
                msg: '新增成功',
                data: doc
            }
            return false
        }
    } catch (err) {
        console.log(err)
        ctx.body = {
            code: -1,
            msg: '保存失败，请重新保存'
        }
    }
})

// 修改
router.get('/add', async (ctx, next) => {
    // 卖家id
    const buyid = ctx.query.buyid
    // 商品总数
    const amount = 0
    // 退货商品
    const return_goods = ctx.query.return_goods || null
    // 总价
    let total_price = 0
    // 购买商品
    let goods = JSON.parse(ctx.query.goods) || []
    goods = goods.map(async (item, key, ary) => {
        const goodsPrice = await Goods.findOne({ _id: item.id }).price
        const goodsSubtotal = parseFloat(goodsPrice) * item.count.toFixed(2)
        total_price += goodsSubtotal
        return {
            id: item.id,
            count: item.count,
            subtotal: goodsSubtotal
        }
    })
    // 运费
    const freight = ctx.query.freight
    // 退货备注
    const return_leave_word = ctx.query.return_leave_word || null
    // 购买备注
    const leave_word = ctx.query.leave_word
    // 退货总价
    const return_total_price = ctx.query.return_total_price || 0
    // 收货地址
    const address = ctx.query.address
    // 订单状态
    let state = 1
    // 订单id
    const id = ctx.query.id || null
    try {
        if (id) {
            const goods = await Order.findOneAndUpdate({ _id: id }, {
                title,
                min_title,
                classify,
                brand,
                img,
                price,
                cost,
                introduce
            })
            if (goods) {
                ctx.body = {
                    code: 0,
                    msg: '保存成功',
                    data: goods
                }
                return false
            } else {
                ctx.body = {
                    code: 1,
                    msg: '保存失败'
                }
                return false
            }
        } else {
            let doc = await new Order({
                buyid,
                amount,
                goods,
                freight,
                leave_word,
                total_price,
                address,
                state
            }).save()
            if (isEmpty(doc)) {
                ctx.body = {
                    code: 0,
                    msg: '新增成功',
                    data: doc
                }
                return false
            }
        }
    } catch (err) {
        console.log(err)
        ctx.body = {
            code: -1,
            msg: '保存失败，请重新保存'
        }
    }
})

// 删除
router.get('/del', async ctx => {
    const ids = ctx.query.ids.split(',')
    try {
        if (await Goods.remove({ id: { $in: ids } })) {
            const res = {
                code: 0,
                msg: '删除成功'
            }
            ctx.body = res
        } else {
            const res = {
                code: -1,
                msg: 'sorry，数据请求失败，请刷新页面重新尝试'
            }
            ctx.body = res
        }
    } catch (err) {
        console.log(err)
        const res = {
            code: -1,
            msg: 'sorry，数据请求失败，请刷新页面重新尝试'
        }
        ctx.body = res
    }
});

module.exports = router