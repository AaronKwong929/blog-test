# 个人博客系统 V1.0.0

## 文件目录

```j
blog-test/
|
+- controllers/ <-- Controller
|
+- views/ <-- html文件
|
+- static/ <-- bootstrap
|
+- controller.js <-- 挂到router的方法
|
+- app.js <-- main
|
+- static-files.js <-- 读取静态资源文件
|
+- templating.js <-- 整合Nunjucks
|
+- package.json
|
+- node_modules/
|
+- sess/ <-- 存放本地cookie
|
+- session-store <-- 对于koa-session存放的测试
|
+- users.js <-- 存放对用户操作的方法
|
+- users.json <-- 存放用户数据
```

## 删除文章的操作难点：

不太明白怎么将链接的 herf 指定到本网页的下一级
/articles/:title/delete

### 解法： nunjucks字符串拼接，此处应该认真学习nunjucks的文档

```html
<a href="{{ "/articles/" + article.title + "/delete" }}">删除</a>
```

## 覆盖 Bootstrap 样式，目前唯一解法 -> 内联写样式：

```html
<div class="jumbotron" style="background:orange;"></div>
```

## 表单内的提交按钮可以如下操作

```html
<button type="submit" class="btn btn-primary btn-lg">
    登陆
</button>
```

## 表单外的按钮，使用a标签

```html
<a class="btn btn-primary btn-lg" href="/" role="button">返回</a>
```

## koa-session相关

[1](https://www.jianshu.com/p/8f4cc45d712e)

[2](https://segmentfault.com/a/1190000012412299)

### 清除session只用 ctx.session = null 无效，需要在fn_signin内使用

```javascript
JSON.stringify(ctx.session) !== '{}'；
```

[判断JS对象是否为空的几个方法](https://blog.csdn.net/fungleo/article/details/78113661)

## 1234

使用了mz，并通过require('mz/fs');导入。mz提供的API和Node.js的fs模块完全相同，但fs模块使用回调，而mz封装了fs对应的函数，并改为Promise。这样，我们就可以非常简单的用await调用mz的函数，而不需要任何回调。

## 用到的库：

[koa（中文网](https://koa.bootcss.com/)
[koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser)
[koa-session](https://www.npmjs.com/package/koa-session)
[path](http://nodejs.cn/api/path.html)
[fs](http://nodejs.cn/api/fs.html)
[mz/fs](https://www.npmjs.com/package/mz)
[mime的npm文档](https://www.npmjs.com/package/mime)
[使用mime](https://www.jianshu.com/p/1ce720f20fc1)
[nunjucks（中文](https://nunjucks.bootcss.com/)