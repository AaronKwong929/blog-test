var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welclome',
    })
};

var fn_signIn = async (ctx, next) => {
    var email = ctx.request.body.email,
    password = ctx.request.body.password;
    if (email === 'admin' && password === '123') {
        ctx.render('signin-ok.html', {
            title: 'Sign In OK',
            name: 'Mr.Node',
        });
    } else {
        ctx.render('signin-failed.html', {
            title: 'Sign In Failed.',
        })
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signIn
};