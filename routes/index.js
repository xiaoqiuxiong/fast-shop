const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index', { title: '首页', mainTitle: '我的桌面', subTitle: '', userInfo: ctx.userInfo });
})

router.get('/welcome', async (ctx, next) => {
    await ctx.render('welcome', { title: '首页', mainTitle: '我的桌面', subTitle: '', userInfo: ctx.userInfo });
})

router.get('/userdetail', async (ctx, next) => {
    await ctx.render('userdetail', { userInfo: ctx.userInfo });
})


module.exports = router