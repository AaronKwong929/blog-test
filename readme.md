# 个人博客系统 V1.0.0

## 文件目录

```j
blog-test/
|
+- controllers/ <-- Controller
|
+- views/ <-- html文件
|
+- static/ <-- 静态资源文件（bootstrap
|
+- controller.js <-- 扫描注册Controller
|
+- app.js <-- 使用koa的js
|
+- static-files.js <-- 读取静态资源文件的js
|
+- templating.js <-- 整合Nunjucks的js
|
+- package.json
|
+- node_modules/
```

## 删除文章的操作难点：

不太明白怎么将链接的 herf 指定到本网页的下一级
/articles/:title/delete

### 解法： 字符串拼接

```html
<a href="{{ "/articles/" + article.title + "/delete" }}">删除</a>
```

## 覆盖 Bootstrap 样式的方法

```html
<div class="jumbotron" style="background:orange;"></div>
```

## 居中操作

```html
<div
    class="container"
    style="margin-bottom:30px;display: table;width: 800px;margin-left: auto;margin-right: auto;"
></div>
```

## 表单内的按钮可以直接

```html
<button type="submit" class="btn btn-primary btn-lg">
    登陆
</button>
```

## 表单外的按钮：

```html
<a class="btn btn-primary btn-lg" href="/" role="button">返回</a>
```

## koa-session相关

### 学习： [koa-session](https://www.jianshu.com/p/8f4cc45d712e)

[2](https://segmentfault.com/a/1190000012412299)

### 清除session只用 ctx.session = null 无效，需要在fn_signin内使用

```javascript
var fn_index = async (ctx, next) => {
    if (JSON.stringify(ctx.session) !== '{}') {
        console.log(ctx.session);
        const name = ctx.session.name;
        ctx.render('index-with-login.html', {
            name,
        });
    } else {
        ctx.render('index.html', {
            title: 'Welclome'
        });
    }
};
```

### 用JSON.stringify(ctx.session) !== '{}' 判断session是否为空对象，否则继续渲染已登陆页面

[判断JS对象是否为空的几个方法](https://blog.csdn.net/fungleo/article/details/78113661)