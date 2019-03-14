const router = require('koa-router')()
const Address = require('../schemas/address')

router.prefix('/address')

router.get('/', async (ctx, next) => {
    await ctx.render('address/list',{member: ctx.query.member})
})

module.exports = router