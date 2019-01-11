const Router = require('koa-router')
const router = new Router()

router.prefix('/register')
router.get('/', async (ctx, next) => {
	// 登录验证，已登陆返回首页
    if (ctx.isAuthenticated()) {
        await ctx.render('/redirect', {title: '主页'})
    } else {
        await ctx.render('register', {title: '注册'});
    }
})

module.exports = router