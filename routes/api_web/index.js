const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const Member = require('../../schemas/member')
const Ids = require('../../schemas/ids')

// 判断方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return false;
    } else {
        return true;
    }
}

router.prefix('/api_web')

// 注册
router.post('/register', async (ctx, next) => {
    let body = ctx.request.body
    console.log(body)
    let phone = body.phone
    let password = body.password
    let img = body.img
    let nickname = body.nickname
    let name = body.name
    let sex = body.sex
    let provinces = body.provinces
    let city = body.city

    let ids = await Ids.find({ id: 1 })
    let member_num = 0
    if (!isEmpty(ids)) {
        await new Ids().save()
    } else {
        member_num = ids[0].member_num
    }

    // 加密模块
    const crypto = require('crypto')
    const hash = crypto.createHash('sha1') //'md5'<'sha1'<'sha256'<'sha512  '
    password = hash.update(password).digest('hex')

    try {
        const member = await Member.findOne({ phone })
        if (isEmpty(member)) {
            ctx.body = {
                code: 2,
                msg: '该手机号码已经被注册'
            }
            return
        }
        let doc = await new Member({
            id: member_num + 1,
            phone,
            password,
            img,
            nickname,
            name,
            sex,
            provinces,
            city
        }).save()
        if (isEmpty(doc)) {
            await Ids.findOneAndUpdate({ id: 1 }, { member_num: member_num + 1 })
            ctx.body = {
                code: 0,
                msg: '注册成功',
                data: doc
            }
        }
    } catch (err) {
        console.log(err)
        ctx.body = {
            code: -1,
            msg: '注册失败，请重新注册'
        }
    }
})

// 登录
router.post('/login', async ctx => {
    const body = ctx.request.body
    const phone = body.phone
    let password = body.password

    try {
        // 加密模块
        const crypto = require('crypto')
        const hash = crypto.createHash('sha1') //'md5'<'sha1'<'sha256'<'sha512  '
        password = hash.update(password).digest('hex')

        const doc = await Member.findOne({ phone, password }).select("-password")
        if (doc) {
            const token = 'Bearer ' + jwt.sign({ data: doc }, 'xiaoqiuxiong', { 'expiresIn': 60 * 60 * 24 })
            ctx.body = {
                code: 0,
                msg: '登录成功',
                token: token
            }
        } else {
            ctx.body = {
                code: 1,
                msg: '手机号码或者密码错误'
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: -1,
            msg: '登录失败'
        }
    }
});

module.exports = router