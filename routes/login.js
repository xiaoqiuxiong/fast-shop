const Router = require('koa-router')
const router = new Router()

router.prefix('/login')

router.get('/', async (ctx, next) => {
     // 登录验证，已登陆返回首页
    if (ctx.isAuthenticated()) {
        await ctx.redirect('/', {title: '主页'})
    } else {
        await ctx.render('login',{title: '登录'});
    }
})

module.exports = router