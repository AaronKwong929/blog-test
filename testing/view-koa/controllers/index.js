var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welc;ome',
    })
};

var signin = async (ctx, next) => {
    var email = ctx.request.body.email,
    password = ctx.request.body.password;
    if (email === 'admin@exp.com' && password === '123') {
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