
---

---

# koa-router

### router.get()

.get('/path', async fn) 注册一个get请求，

```javascript
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
```

请求路径中使用带变量的/hello/:name 通过ctx.params.name访问（可以是/:na1，访问变量为ctx.params.na1

---

### router.post()

同get()  .post('/path', async fn)  
post请求通常会发送一个表单或json 作为request的body发送，而node.js和koa提供的request对象 不提供 解析request的body的功能

```cmd
npm install koa-bodyparser
```

