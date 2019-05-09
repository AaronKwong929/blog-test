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
    var articless = articles.getArticles();
    ctx.render('catalog.html', {
        title: 'Articles Catalog',
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
    ctx.redirect(`/articles/${title}`);
};

var fn_delete = async (ctx, next) => {
    var title = ctx.params.title;
    console.log(`deleting ${title}`);
    articles.removeNote(title);
    ctx.redirect('/articles');
};

var fn_edit = async (ctx, next) => {
    if (ctx.method === 'GET') {
        var title = ctx.params.title;
        console.log(title);
        const article = articles.readArticle(title);
        ctx.render('edit-article.html', {
            title: 'edit-article',
            article
        });
    } else if (ctx.method === 'POST') {
        var title = ctx.request.body.title,
            content = ctx.request.body.content,
            time = new Date().toLocaleString();
        console.log(`${title}  ${content} ${time}`);
        articles.editArticle(title, content, time);
        ctx.redirect('/articles');
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signIn,
    'GET /articles': fn_catalog,
    'GET /articles/:title': fn_article,
    'GET /new': fn_new,
    'POST /new': fn_new_submit,
    'GET /articles/:title/delete': fn_delete,
    'GET /articles/:title/edit': fn_edit,
    'POST /articles/:title/edit': fn_edit
};
