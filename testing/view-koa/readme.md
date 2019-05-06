# view-koa 用于整合koa2 nunjucks，把原来直接输出字符串的方式改为 ctx.render(view, model)

## static-files.js

### staticFiles接受两个参数，url前缀和一个目录，返回一个async fn， 这个函数判断当前url是否以指定前缀开头，是：把url路径视为文件，发送文件内容；否：调用await next()

## require('mz/fs') mz封装了fs对应函数并改为promise 可以简单使用await调用mz函数不需要回调

## 集成Nunjucks templating.js：给ctx对象绑定一个render(view, model)方法，后面的controller可以调用这个方法来渲染模板

### 在这个middleware中只给ctx安装了一个render()函数，然后继续调用下一个middleware

此时在app.js添加如下代码：

```javascript
const isProduction = process.env.NODE_ENV === 'production';

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));
```

用于判断当前是否production环境，是则使用缓存，不是则关闭缓存，在开发环境下关闭缓存后修改view刷新浏览器查看效果，否则每次修改都必须重启Node  

Node在全局变量process中定义了一个环境变量env.NODE_ENV，在开发时候环境变量设置成development，在部署到服务器时改为production，根据当前环境修改

### 注意在生产环境上必须配置NODE_ENV = 'production' 而开发环境不需要配置，不要使用NODE_ENV === 'development'

