const router = require('koa-router')()
const User = require('../../schemas/user')

// 判断方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return false;
    } else {
        return true;
    }
}

router.prefix('/api_admin/admins')

// 获取管理员列表
router.get('/', async ctx => {
    let page = Number(ctx.query.page || 1)
    const limit = Number(ctx.query.limit || 10)
    let pages = 0
    const searchData = ctx.query.searchData
    //不区分大小写
    const reg = new RegExp(searchData, 'i')
    try {
        const total = await User.count({
            $or: [
                {nickname: { $regex: reg }},
                {phone: { $regex: reg }}
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
        let orders = await User.find({
            $or: [
                {nickname: { $regex: reg }},
                {phone: { $regex: reg }}
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

// 删除管理员
router.get('/del', async ctx => {
    const ids = ctx.query.ids.split(',')
    try {
        if (await User.remove({ _id: { $in: ids } })) {
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