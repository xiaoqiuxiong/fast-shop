const router = require('koa-router')()

router.prefix('/users')
const title = '主页'
const mainTitle = '会员管理'

router.get('/', async (ctx, next)=> {
  await ctx.render('users', { title: title, mainTitle: mainTitle, subTitle: '会员列表'})
})

module.exports = router
