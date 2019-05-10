const session = require('koa-session-minimal');
const bodyParser = require('koa-bodyparser');
//app.keys = ['aaaaaron'];  // 随便写用来加密cookie
 
module.exports = app => {
    // 应用解析请求体的中间件, koa-bodyparser 支持 json, form, text 类型的请求体
    app.use(bodyParser())
    // 应用处理 session 的中间件
    app.use(session({
        key: 'session-name',          // cookie 中存储 session-id 时的键名, 默认为 koa:sess
        cookie: {                   // 与 cookie 相关的配置
            domain: 'localhost',    // 写 cookie 所在的域名
            path: '/',              // 写 cookie 所在的路径
            maxAge: 1000 * 30,      // cookie 有效时长
            httpOnly: true,         // 是否只用于 http 请求中获取
            overwrite: false        // 是否允许重写
        }
    }))
}
