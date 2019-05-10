const articles = require('../articles.js');
const users = require('../users.js');

var fn_index = async (ctx, next) => {
    if (JSON.stringify(ctx.session) !== '{}') {
        const name = ctx.session.name;
        if (users.isAdmin(name)) {
            ctx.render('admin-login.html', {
                name
            });
        } else {
            ctx.render('user-login.html', {
                name
            });
        }
    } else {
        ctx.render('index.html', {
            title: 'Welclome'
        });
    }
};

var fn_signIn = async (ctx, next) => {
    if (ctx.method === 'GET') {
        ctx.render('signin.html', {
            title: 'Sign In'
        });
    } else if (ctx.method === 'POST') {
        var name = ctx.request.body.name,
            password = ctx.request.body.password;
        if (users.varifyUser(name, password)) {
            ctx.session.name = name;
            if (users.isAdmin(name)) {
                ctx.render('admin-login.html', {
                    name
                });
            } else {
                ctx.render('user-login.html', {
                    name
                });
            }
        } else {
            ctx.render('signin-failed.html', {
                title: 'Sign In Failed.'
            });
        }
    }
};

var fn_catalog = async (ctx, next) => {
    if (JSON.stringify(ctx.session) !== '{}') {
        var articless = articles.loadArticles();
        ctx.render('catalog.html', {
            title: 'Articles Catalog',
            articless
        });
    } else {
        ctx.redirect('/needtologin');
    }
};

const fn_needToLogin = async (ctx, next) => {
    ctx.render('need-to-login.html');
};

var fn_article = async (ctx, next) => {
    const article = articles.readArticle(ctx.params.title);
    if (users.isAdmin(ctx.session.name)) {
        ctx.render('admin-article.html', {
            title: '文章详情',
            article
        });
    } else {
        ctx.render('user-article.html', {
            title: '文章详情',
            article,
        })
    }
};

var fn_new = async (ctx, next) => {
    ctx.render('new-article.html', {
        title: 'New Article'
    });
};

var fn_new_submit = async (ctx, next) => {
    var title = ctx.request.body.title,
        content = ctx.request.body.content;
    articles.addArticle(title, content);
    ctx.redirect(`/articles/${title}`);
};

var fn_delete = async (ctx, next) => {
    var title = ctx.params.title;
    articles.removeNote(title);
    console.log(ctx.session.name);
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
            content = ctx.request.body.content;
        articles.editArticle(title, content);
        ctx.redirect(`/articles/${title}`);
    }
};

var fn_about = (ctx, next) => {
    ctx.render('about.html', {
        title: 'About'
    });
};

var fn_signUp = (ctx, next) => {
    if (ctx.method === 'GET') {
        ctx.render('signup.html', {});
    } else if (ctx.method === 'POST') {
        const userName = ctx.request.body.name;
        const userPassword = ctx.request.body.password;
        if (!users.findUser(userName)) {
            users.addUser(userName, userPassword);
            ctx.session.name = userName;
            ctx.render('signup-ok.html', {
                title: 'Successful'
            });
        } else {
            ctx.render('signup-failed.html'),
                {
                    title: 'Failed'
                };
        }
    }
};

const fn_logout = (ctx, next) => {
    ctx.session = null;
    ctx.redirect('/');
};

module.exports = {
    'GET /': fn_index,
    'GET /signin': fn_signIn,
    'POST /signin': fn_signIn,
    'GET /articles': fn_catalog,
    'GET /articles/:title': fn_article,
    'GET /new': fn_new,
    'POST /new': fn_new_submit,
    'GET /articles/:title/delete': fn_delete,
    'GET /articles/:title/edit': fn_edit,
    'POST /articles/:title/edit': fn_edit,
    'GET /about': fn_about,
    'GET /signup': fn_signUp,
    'POST /signup': fn_signUp,
    'GET /logout': fn_logout,
    'GET /needtologin': fn_needToLogin
};
