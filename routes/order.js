const router = require('koa-router')()

router.prefix('/order')
const title = '主页'
const mainTitle = '订单管理'

router.get('/', async (ctx, next)=> {
  await ctx.render('order/list', { title: title, mainTitle: mainTitle, subTitle: '订单列表'})
})

router.get('/sales_return', async (ctx, next)=> {
  await ctx.render('order/sales_return_list', { title: title, mainTitle: mainTitle, subTitle: '退货单列表'})
})

module.exports = router
