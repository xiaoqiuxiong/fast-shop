const Koa = require('koa')
// 引入koa2-cors "允许跨域"
const cors = require('koa2-cors')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const passport = require('./until/passport')
const session = require('koa-session')

const registerRouter = require('./routes')
const jwtKoa = require('koa-jwt')
const secret = 'jwt fastshop'

const app = new Koa()
// 具体参数我们在后面进行解释
app.use(cors({
    origin: function(ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// app.use(cors())


// error handler
onerror(app)
//配置session的中间件
app.keys = ['fastshop']
app.use(bodyParser())
app.use(session({
    key: 'koa:fastshop',
    /** cookie的名称，可以不管 */
    maxAge: 1000 * 60 * 60 * 24,
    /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    signed: true
}, app))

app.use(passport.initialize())
app.use(passport.session())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))
// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//定义允许直接访问的url
const allowpage = [
    '/login',
    '/register',
    '/api_admin/login',
    '/api_admin/logout',
    '/api_admin/register',
    '/api_admin/symbols',
    '/api_admin/history',
    '/api_admin/config',
    '/api_admin/login',
    '/reception_api/register',
    '/reception_api/baseInfo',
    '/reception_api/test',
    '/reception_api/goods'
]
//拦截
function localFilter(ctx) {
    if (allowpage.indexOf(ctx.originalUrl) <= -1 && !ctx.isAuthenticated()) {
        ctx.redirect('/login')
    }
}
// session拦截
app.use(async (ctx, next) => {
    localFilter(ctx)
    await next()
})

//配置中间件 获取url的地址
app.use(async (ctx, next) => {
    //模板引擎配置全局的变量
    if (ctx.session.userinfo) {
        ctx.state.userinfo = ctx.session.userinfo
    } else {
        ctx.state.userinfo = false
    }

    await next()
})
app.use((ctx, next) => {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 200;
            ctx.body = {
                code: 100,
                msg: '登陆已失效'
            };
        } else {
            throw err;
        }
    });
});

app.use(jwtKoa({
    secret
}).unless({
    // /^((?!reception_api).)*$/ 匹配不包含reception_api的url
    //数组中的路径不需要通过jwt验证
    path: [/^((?!reception_api).)*$/, '/reception_api/login', '/reception_api/register']
}))

app.use(async (ctx, next) => { 
    ctx.state.alltitle = 'F-shop 快商城'
    await next()
})
//加载自定义全局方法

// routes
app.use(registerRouter())
app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        await ctx.render('index', { title: '首页' })
    }
    next()
})
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});
module.exports = app