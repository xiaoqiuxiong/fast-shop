const Router = require('koa-router')
const router = new Router()

router.prefix('/register')
router.get('/', async (ctx, next) => {
    await ctx.render('register', { title: 'FASTSHOP', mainTitle: 'FASTSHOP', subTitle: '注册' });
})

module.exports = router