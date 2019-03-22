/*
 * @Author: Administrator
 * @Date:   2019-03-11 21:38:20
 * @Last Modified by:   Administrator
 * @Last Modified time: 2019-03-11 22:43:55
 */
const router = require('koa-router')()
const Goods = require('../../schemas/goods')
const Ids = require('../../schemas/ids')

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
            ],
            is_del: false
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
            ],
            is_del: false
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
    let title = ctx.query.title
    let min_title = ctx.query.min_title
    let classify = ctx.query.classify
    let brand = ctx.query.brand
    let img = [ctx.query.pic]
    let price = ctx.query.price
    let cost = ctx.query.cost || ctx.query.price
    let introduce = ctx.query.introduce
    let is_sell = ctx.query.is_sell || null
    if(is_sell == 'on'){
        is_sell = true
    }else{
        is_sell = false
    }
    let id = ctx.query.id || null
    try {
        if (id) {
            const goods = await Goods.findOneAndUpdate({ id: id }, {
                title,
                min_title,
                classify,
                brand,
                img,
                price,
                cost,
                is_sell,
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
            let ids = await Ids.find({ id: 1 })
            let goods_num = 0
            if (!isEmpty(ids)) {
                await new Ids().save()
            } else {
                goods_num = ids[0].goods_num
            }

            let doc = await new Goods({
                id: goods_num + 1,
                title,
                min_title,
                classify,
                brand,
                img,
                price,
                cost,
                is_sell,
                introduce
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


// 删除(假删除)
router.get('/del', async ctx => {
    const ids = ctx.query.ids.split(',')
    try {
        if (await Goods.updateMany({ id: { $in: ids } }, { is_del: true })) {
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