# 各种新功能和实验测试场所

5-2 假装今天有更新

5-3 重写了 file_server.js => file_server_restructure.js  
对 fs 的方法了解了多一点 fs.existsSync()  
fs.exists()已废弃，用 Sync 不用回调直接返回 boolean

## 对于 Koa middleware - await next()的理解

```javascript
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(2);
});
app.use(async (ctx, next) => {
    console.log(3);
    await next();
    console.log(4);
});

app.use(async (ctx, next) => {
    console.log(5);
    await next();
    console.log(6);
});

app.listen(3000);
console.log('app2 started at port 3000');
```

### 此处会输出 1 3 5 6 4 2

### 即：app.use()执行 遇到

```javascript
await next()
```

### 时，跳转到下一个app.use()， 当不存在下一个await next()时，依次从下往上走。

### 而如果遇到：

``` javascript
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(2);
});
app.use(async (ctx, next) => {
    console.log(3);
    await next();
    console.log(4);
});

app.use(async (ctx, next) => {
    await next();
    console.log(5);
});
```

### 输出的是 1 3 5 4 2

### 再者：

```javascript
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(2);
});
app.use(async (ctx, next) => {
    await next();
    console.log(3);
});

app.use(async (ctx, next) => {
    await next();
    console.log(4);
});
```

### 则输出 1 4 3 2

### 即如果先遇到await next() 则执行下一个app.use()，而如果没有下一个app.use或下一个await next()了，执行最后一个然后依次从下往上执行