const router = require('koa-router')()
const Address = require('../../schemas/address')
const Ids = require('../../schemas/ids')

// 判断方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return false;
    } else {
        return true;
    }
}

router.prefix('/api_web/address')

// 获取地址列表
router.get('/', async ctx => {
    let page = Number(ctx.query.page || 1)
    const limit = Number(ctx.query.limit || 10)
    let pages = 0
    const searchData = ctx.query.searchData
    //不区分大小写
    const reg = new RegExp(searchData, 'i')
    try {
        const total = await Address.count({
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
    const name = ctx.query.name
    const phone = ctx.query.phone
    const province = ctx.query.province
    const city = ctx.query.city
    const towns = ctx.query.towns
    const detail = ctx.query.detail
    const user = ctx.query.user
    const isCommon = ctx.query.isCommon
    let id = ctx.query.id || null
    try {
        if (id) {
            const address = await Address.findOneAndUpdate({ id }, {
                name,
                phone,
                province,
                city,
                towns,
                detail,
                user,
                isCommon
            })
            if (address) {
                ctx.body = {
                    code: 0,
                    msg: '保存成功',
                    data: address
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
            let address_num = 0
            if (!isEmpty(ids)) {
                await new Ids().save()
            } else {
                address_num = ids[0].address_num
            }

            let doc = await new Address({
                id: address_num + 1,
                name,
                phone,
                province,
                city,
                towns,
                detail,
                user,
                isCommon
            }).save()
            if (isEmpty(doc)) {
                await Ids.findOneAndUpdate({ id: 1 }, { address_num: address_num + 1 })
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


module.exports = router