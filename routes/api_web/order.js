const router = require('koa-router')()
const Order = require('../../schemas/order')

// 判断方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return false;
    } else {
        return true;
    }
}

router.prefix('/api_admin/goods')

// 获取品牌列表
router.get('/', async ctx => {
    let page = Number(ctx.query.page || 1)
    const limit = Number(ctx.query.limit || 10)
    let pages = 0
    const searchData = ctx.query.searchData
    //不区分大小写
    const reg = new RegExp(searchData, 'i')
    try {
        const total = await Goods.count({
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
        let orders = await Goods.find({
            $or: [
                { id: ({ $regex: reg }) },
                { title: { $regex: reg } }
            ]
        }).sort({ id: 1 }).limit(limit).skip(skip).populate(['brand', 'classify'])
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
    const buyid = ctx.query.buyid
    const amount = 0
    const return_goods = ctx.query.return_goods || ''
    const goods = ctx.query.goods
    const freight = ctx.query.freight
    const return_leave_word = ctx.query.return_leave_word || ''
    const leave_word = ctx.query.leave_word
    const total_price = ctx.query.total_price
    const return_total_price = ctx.query.return_total_price || 0
    const address = ctx.query.address
    let state = 1
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
                const buyid = ctx.query.buyid
    const amount = 0
    const return_goods = ctx.query.return_goods || ''
    const goods = ctx.query.goods
    const freight = ctx.query.freight
    const return_leave_word = ctx.query.return_leave_word || ''
    const leave_word = ctx.query.leave_word
    const total_price = ctx.query.total_price
    const return_total_price = ctx.query.return_total_price || 0
    const address = ctx.query.address
    let state = 1
            }).save()
            if (isEmpty(doc)) {
                await Ids.findOneAndUpdate({ id: 1 }, { goods_num: goods_num + 1 })
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