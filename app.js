const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controller = require('./controller.js')
const templating = require('./templating.js');
const session = require('koa-session');
const path = require('path');
const fs = require('fs');
//require('./session')(app);
const isProduction = process.env.NODE_ENV === 'production'; // 部署（生产环境production使用缓存，开发环境development不使用，直接刷新浏览器查看效果不需要重启node

app.use(async (ctx, next) => {
    console.log(`Process${ctx.request.method} ${ctx.request.url}`);
    var start = new Date().getTime(),
    execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set(`X-Response-Time`, `${execTime}ms`)
});

if (!isProduction) {
    let staticFiles = require('./static-files.js');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
// 在生产环境下静态文件是由部署在最前面的反向代理服务器（Nginx）处理的，node程序不需要处理静态文件，在开发环境下希望koa顺带处理静态文件，否则必须手动配置一个反向代理服务器，导致开发环境复杂

app.use(bodyParser());

//app.use(staticFiles('/static/', __dirname + '/static'));


app.use(
    templating('views', {
        noCache: !isProduction,
        watch: !isProduction
    })
);


const store = {
    get(key) {
        const sessionDir = path.resolve(__dirname, './sess');
        const files = fs.readdirSync(sessionDir);

        for (let i = 0; i < files.length; i++) {
            if (files[i].startsWith(key)) {
                const filepath = path.resolve(sessionDir, files[i]);
                delete require.cache[require.resolve(filepath)];
                const result = require(filepath);
                return result;
            }
        }
    },
    set(key, session) {
        const filePath = path.resolve(__dirname, './sess', `${key}.js`);
        const content = `module.exports = ${JSON.stringify(session)};`;

        fs.writeFileSync(filePath, content);
    },

    destroy(key) {
        const filePath = path.resolve(__dirname, './sess', `${key}.js`);
        fs.unlinkSync(filePath);
    }
};

app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  store:store,
};
 
app.use(session(CONFIG, app));
app.use(controller());
app.listen(3000);
console.log('app started at port 3000');
  