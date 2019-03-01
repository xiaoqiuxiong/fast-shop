const router = require('koa-router')()
const passport = require('passport')
const User = require('../../schemas/user')

// 判断方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return false;
    } else {
        return true;
    }
}

router.prefix('/api_admin')

// 登录
router.post('/login', async ctx => {
    let body = ctx.request.body
    // 调用策略
    await passport.authenticate('local', (err, user, info, status) => {
        if (isEmpty(user)) {
            const userInfo = {
                userid: user._id,
                nickname: user.nickname,
                phone: user.phone,
                cip: user.cip,
                cname: user.cname,
                isSuper: user.isSuper
            }
            ctx.cookies.set('userInfo', new Buffer(JSON.stringify(userInfo)).toString('base64'))
            ctx.body = {
                code: 0,
                msg: info
            };
        } else {
            ctx.body = {
                code: 1,
                msg: info
            }
        }
        ctx.login(user)
    })(ctx)
});

// 退出登录
router.get('/logout', (ctx, next) => {
    ctx.logout()
    ctx.body = {
        code: 0
    }
})

// 注册
router.post('/register', async (ctx, next) => {
    let body = ctx.request.body
    let phone = body.phone
    let password = body.password
    let cip = body.cip
    let cname = body.cname
    // 加密模块
    const crypto = require('crypto')
    const hash = crypto.createHash('sha1') //'md5'<'sha1'<'sha256'<'sha512  '
    password = hash.update(body.password).digest('hex')
    try {
        const user = await User.findOne({
            phone
        })
        if (isEmpty(user)) {
            ctx.body = {
                code: 2,
                msg: '该手机号码已经被注册',
                data: user
            }
            return
        }
        let doc = await new User({
            phone,
            cip,
            cname,
            password
        }).save()
        if (isEmpty(doc)) {
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

module.exports = router