const Koa = require('koa');
const app = new Koa();
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(2);
});
app.use(async (ctx, next) => {
    //console.log(3);
    await next();
    console.log(3);
});

app.use(async (ctx, next) => {
    //console.log(5);
    await next();
    //console.log(6);
    console.log(4);
});

app.listen(3000);
console.log('app2 started at port 3000');