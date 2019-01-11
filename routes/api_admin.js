const router = require('koa-router')()
const User = require('../schemas/user')
const passport = require('passport')
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
    // 调用策略
    await passport.authenticate('local',
        (err, user, info, status) => {
            if (isEmpty(user)) {
                ctx.session.userinfo = user;
                ctx.body = {
                    code: 0,
                    msg: info
                }
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
    ctx.session.userinfo = ''
    ctx.body = {
        code: 0
    }
    // await ctx.redirect('/login', {title: '登录'})
})

router.post('/register', async (ctx, next) => {
    let body = ctx.request.body
    let phone = body.phone
    let password = body.password
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
        console.log(666)
        let doc = await new User({
            phone,
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