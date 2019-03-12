/*
 * @Author: Administrator
 * @Date:   2019-03-10 17:38:54
 * @Last Modified by:   Administrator
 * @Last Modified time: 2019-03-10 21:49:26
 */
const router = require('koa-router')()
const Classify = require('../../schemas/classify')
const Ids = require('../../schemas/ids')

// 判断方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return false;
    } else {
        return true;
    }
}

router.prefix('/api_admin/classify')

// 获取分类列表
router.get('/', async ctx => {
    let page = Number(ctx.query.page || 1)
    const limit = Number(ctx.query.limit || 10)
    let pages = 0
    const searchData = ctx.query.searchData
    //不区分大小写
    const reg = new RegExp(searchData, 'i')
    try {
        const total = await Classify.count({
            $or: [
                { id: { $regex: reg } },
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
        let orders = await Classify.find({
            $or: [
                { id: { $regex: reg } },
                { name: { $regex: reg } }
            ]
        }).sort({ id: 1 }).limit(limit).skip(skip)
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
    let isUse = ctx.query.isUse
    let classifyId = ctx.query.id || null
    if (isUse == 0) {
        isUse = true
    } else {
        isUse = false
    }
    try {
        if (classifyId) {
            const classify = await Classify.findOneAndUpdate({ id: classifyId }, {
                name,
                isUse
            })
            if (classify) {
                ctx.body = {
                    code: 0,
                    msg: '保存成功',
                    data: classify
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
            let classify_num = 0
            if (!isEmpty(ids)) {
                await new Ids().save()
            } else {
                classify_num = ids[0].classify_num
            }

            const classify = await Classify.findOne({ name })
            if (isEmpty(classify)) {
                ctx.body = {
                    code: 2,
                    msg: '该品牌已经存在'
                }
                return false
            }
            let doc = await new Classify({
                id: classify_num + 1,
                name,
                isUse
            }).save()
            if (isEmpty(doc)) {
                await Ids.findOneAndUpdate({ id: 1 }, { classify_num: classify_num + 1 })
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
        if (await Classify.remove({ _id: { $in: ids } })) {
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