const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
// log request url
app.use(async (ctx, next) => {
    console.log(`Process${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 在请求路径中使用带变量的/hello/:name 通过ctx.params.name访问
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
    
});

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>`;
});

router.get('/404', async (ctx, next) => {
    ctx.body = '<h1>404 not found</h1>';
});

app.use(router.routes());

app.listen(3000);
console.log(`app started at port 3000`);