const Router = require('koa-router')
const router = new Router()

router.get('/login', async (ctx, next) => {
    await ctx.render('login', { title: 'FASTSHOP', mainTitle: 'FASTSHOP', subTitle: '登录' });
})

module.exports = router