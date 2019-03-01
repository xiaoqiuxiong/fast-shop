const router = require('koa-router')()

router.prefix('/picture')
const title = '主页'
const mainTitle = '图片管理'

router.get('/', async (ctx, next)=> {
  await ctx.render('picture/list', { title: title, mainTitle: mainTitle, subTitle: '图片列表'})
})

router.get('/add', async (ctx, next)=> {
  await ctx.render('picture/add', { title: title, mainTitle: mainTitle, subTitle: '图片添加'})
})

router.get('/label', async (ctx, next)=> {
  await ctx.render('picture/label', { title: title, mainTitle: mainTitle, subTitle: '图片标签'})
})

module.exports = router
