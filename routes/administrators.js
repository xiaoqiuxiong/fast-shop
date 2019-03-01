const router = require('koa-router')()

router.prefix('/administrators')
const title = '主页'
const mainTitle = '管理员管理'

router.get('/', async (ctx, next)=> {
  await ctx.render('administrator/list', { title: title, mainTitle: mainTitle, subTitle: '管理员列表', userInfo: ctx.userInfo})
})

router.get('/logs', async (ctx, next)=> {
  await ctx.render('administrator/logs', { title: title, mainTitle: mainTitle, subTitle: '管理员日志', userInfo: ctx.userInfo})
})

module.exports = router
