const router = require('koa-router')()

router.prefix('/article')
const title = '主页'
const mainTitle = '资讯管理'

router.get('/', async (ctx, next)=> {
  await ctx.render('article/list', { title: title, mainTitle: mainTitle, subTitle: '资讯列表'})
})

router.get('/add', async (ctx, next)=> {
  await ctx.render('article/add', { title: title, mainTitle: mainTitle, subTitle: '资讯添加'})
})

module.exports = router
