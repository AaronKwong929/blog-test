# 重写 koa-router

/controllers/index.js 内：

```javascript
module.exports = {
    'Get /': fn_index,
    'POST /signin': fn_signIn
};
```

这里直接写成 get /和 post/signin 方便之后 app.js 检索文件 统一开头的格式方便操作

## app.js

取文件，再利用 filter 筛选出结尾时.js 的文件

```javascript
var files = fs.readdirSync(__dirname + '/controllers');

var js_files = files.filter(f => {
    return f.endsWith('.js');
});
```

注意这里时 var f of js_files 不是 in：

```javascript
for (var f of js_files)
```

## 将扫描目录和创建 router 的代码整合到 controller.js 中

```javascript
module.exports = function(dir) {
    let controllers_dir = dir || 'controllers', //不传参数默认为controllers文件夹
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
```

## app.js内调用

```javascript
const controller = require('./controller.js');
app.use(controller());
```

## 即可

## 记得在app.js里

```javascript
app.use(bodyParser());
```

## 不然ctx.response.name 返回undefined

## “能传参不用全局变量”--廖雪峰