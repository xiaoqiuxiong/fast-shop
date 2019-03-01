/**
 * 项目入口文件
 */

const Koa = require('koa')
const cors = require('koa2-cors')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const passport = require('./until/passport')
const session = require('koa-session')

const registerRouter = require('./routes/access')
const jwtKoa = require('koa-jwt')
const secret = 'xiaoqiuxiong'

const app = new Koa()

// 具体参数我们在后面进行解释
app.use(cors({
    origin: function(ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


// error handler
onerror(app)

app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))

//配置session的中间件
app.keys = ['fastshop']
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
    })
})

//   /^((?!\/api_web).)*$/  匹配到不包含 /api_web 的地址
app.use(jwtKoa({
    secret
}).unless({
    path: [/^((?!\/api_web).)*$/, '/api_web/login', '/api_web/register']
}))

app.use(async (ctx, next) => {
    if (ctx.url.match(/^\/api_web/)) {
        await next()
    } else if (ctx.url.match(/^\/api_admin/)) {
        if (ctx.url.match(/^\/api_admin\/login/) || ctx.url.match(/^\/api_admin\/register/) || ctx.url.match(/^\/api_admin\/logout/)) {
            await next()
        } else {
            if (!ctx.isAuthenticated()) {
                ctx.body = {
                    code: 100
                }
                return false
            }
            await next()
        }
    } else if (ctx.url.match(/^\/login/) || ctx.url.match(/^\/register/)) {
        ctx.isAuthenticated() ? ctx.redirect('/') : ''
        await next()
    } else {
        !ctx.isAuthenticated() ? ctx.redirect('/login') : ''
        if (ctx.cookies.get('userInfo')) {
            ctx.userInfo = JSON.parse(new Buffer(ctx.cookies.get('userInfo'), 'base64').toString())
        }
        await next()
    }

})

// routes
app.use(registerRouter())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app