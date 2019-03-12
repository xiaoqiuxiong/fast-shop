/*
 * @Author: Administrator
 * @Date:   2019-03-09 22:55:09
 * @Last Modified by:   Administrator
 * @Last Modified time: 2019-03-10 21:36:21
 */
const router = require('koa-router')()
const Brand = require('../../schemas/brand')

// 判断方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return false;
    } else {
        return true;
    }
}

router.prefix('/api_admin/brand')

// 获取品牌列表
router.get('/', async ctx => {
    let page = Number(ctx.query.page || 1)
    const limit = Number(ctx.query.limit || 10)
    let pages = 0
    const searchData = ctx.query.searchData
    //不区分大小写
    const reg = new RegExp(searchData, 'i')
    try {
        const total = await Brand.count({
            $or: [
                { name: { $regex: reg } }
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
        let orders = await Brand.find({
            $or: [
                { name: { $regex: reg } }
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
    let name = ctx.query.name
    let logo = ctx.query.imgurl
    let isChina = ctx.query.isChina
    let describe = ctx.query.describe
    let brandid = ctx.query.brandid || null
    if (isChina == 0) {
        isChina = true
    } else {
        isChina = false
    }
    try {
        if (brandid) {
            const brand = await Brand.findOneAndUpdate({ _id: brandid }, {
                name,
                logo,
                isChina,
                describe
            })
            if (brand) {
                ctx.body = {
                    code: 0,
                    msg: '保存成功',
                    data: brand
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
            const brand = await Brand.findOne({ name })
            if (isEmpty(brand)) {
                ctx.body = {
                    code: 2,
                    msg: '该品牌已经存在'
                }
                return false
            }
            let doc = await new Brand({
                name,
                logo,
                isChina,
                describe
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


// 删除品牌
router.get('/del', async ctx => {
    const ids = ctx.query.ids.split(',')
    try {
        if (await Brand.remove({ _id: { $in: ids } })) {
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