/*
* @Author: Administrator
* @Date:   2019-03-10 00:50:21
* @Last Modified by:   Administrator
* @Last Modified time: 2019-03-10 01:08:25
*/
const router = require('koa-router')()
let qiniuFn = require('../until/qiniuFn')

router.get('/qiniu_token', async (ctx, next) => {
    ctx.body = {
    	code: 0,
    	token: qiniuFn('blogbucket')
    }
})

module.exports = router