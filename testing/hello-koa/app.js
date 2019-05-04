// 导入koa 在koa2中，导入的是一个class 用大写Koa表示
const Koa = require('koa');

// 创建一个Koa对象表示web app本身：
const app = new Koa();

// 对于任何请求app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>hello Koa2!</h1>';
});

// 没收到一个http请求 koa调用通过app.use()注册的async函数 传入ctx next参数
// 对ctx操作并设置返回内容
// 调用await next()：调用下一个async函数，把每个async函数称为middleware，把middleware组合完成功能


app.listen(3000);
console.log('app started at port 3000');