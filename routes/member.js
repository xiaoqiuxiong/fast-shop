const router = require('koa-router')()


router.prefix('/member')

router.get('/', async (ctx, next) => {
    await ctx.render('member/list')
})

module.exports = router