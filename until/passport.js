// passport.js
const passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy
var HttpBearerStategy = require('passport-http-bearer').Strategy // token验证模块
const User = require('../schemas/user')

// 判断方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return false;
    } else {
        return true;
    }
}

// 序列化
passport.serializeUser(function(user, done) {
    return done(null, user);
})

passport.deserializeUser(async function(user, done) {
    const userdata = await User.findById(user._id)
    return done(null, userdata)
})

// 提交数据(策略)
passport.use(new LocalStrategy(async function(phone, password, done) {
    // 加密模块(一个crypto实例只能调用digest一次)
    const user = await User.findOne({ phone: phone })
    try {
        if (isEmpty(user)) {
            const crypto = require('crypto')
            const hash = crypto.createHash('sha1')
            const newpassword = hash.update(password).digest('hex')
            if (user.password === newpassword) {
                done(null, user, '登陆成功')
            } else {
                done(null, false, '密码错误')
            }
        } else {
            done(null, false, '未知用户')
        }
    } catch (err) {
        console.log(err)
        done(null, false, '未知用户')
    }

}))

passport.use(new HttpBearerStategy(
    function(token, done) {
        User.findOne({ token: token }, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
        });
    }
))

module.exports = passport