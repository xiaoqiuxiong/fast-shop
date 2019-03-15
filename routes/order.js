const router = require('koa-router')()

router.prefix('/order')

router.get('/', async (ctx, next)=> {
  await ctx.render('order/list')
})

router.get('/sales_return', async (ctx, next)=> {
  await ctx.render('order/sales_return_list')
})

module.exports = router
