const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controller = require('./controller.js')
const templating = require('./templating.js');
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

app.use(controller());
app.listen(3000);
console.log('app started at port 3000');