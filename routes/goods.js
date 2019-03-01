const router = require('koa-router')()

router.prefix('/goods')
const title = '主页'
const mainTitle = '产品管理'

router.get('/', async (ctx, next)=> {
  await ctx.render('goods/list', { title: title, mainTitle: mainTitle, subTitle: '产品列表'})
})

router.get('/add', async (ctx, next)=> {
  await ctx.render('goods/add', { title: title, mainTitle: mainTitle, subTitle: '产品添加'})
})

router.get('/brand', async (ctx, next)=> {
  await ctx.render('goods/brand', { title: title, mainTitle: mainTitle, subTitle: '品牌管理'})
})

router.get('/classify', async (ctx, next)=> {
  await ctx.render('goods/classify', { title: title, mainTitle: mainTitle, subTitle: '分类管理'})
})

module.exports = router
