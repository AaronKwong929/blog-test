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
