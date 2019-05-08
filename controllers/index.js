const articles = require('../articles.js');

var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welclome'
    });
};

var fn_signIn = async (ctx, next) => {
    var name = ctx.request.body.name,
        password = ctx.request.body.password;
    if (name === 'admin' && password === '123') {
        ctx.render('signin-ok.html', {
            title: 'Sign In OK',
            name: 'Aaron'
        });
    } else {
        ctx.render('signin-failed.html', {
            title: 'Sign In Failed.'
        });
    }
};

var fn_catalog = async (ctx, next) => {
    var articless = articles.getAtricles();
    ctx.render('catalog.html', {
        title: 'Article Catalog',
        articless
    });
};

var fn_article = async (ctx, next) => {
    const article = articles.readArticle(ctx.params.title);
    ctx.render('article.html', {
        title: 'Details',
        article
    });
};

var fn_new = async (ctx, next) => {
    ctx.render('new-article.html', {
        title: 'New Article'
    });
};

var fn_new_submit = async (ctx, next) => {
    var title = ctx.request.body.title,
        content = ctx.request.body.content,
        time = new Date().toLocaleString();
    console.log(`${title}  ${content}  ${time}`);
    articles.addArticle(title, content, time);
    ctx.render('new-ok.html', {
        title: 'Succeed!'
    });
};

var fn_delete = async (ctx, next) => {
    var title = ctx.params.title;
    console.log(`deleting ${title}`);
    ctx.redirect('/catalog');
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signIn,
    'GET /catalog': fn_catalog,
    'GET /articles/:title': fn_article,
    'GET /new': fn_new,
    'POST /new': fn_new_submit,
    'GET /articles/:title/delete': fn_delete
};
