const nunjucks = require('nunjucks');

var createEnv = function(path, opts) {
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch
            }),
            {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            }
        );
    // if (opts.filters) {  //加过滤器 如果有的话
    //     for (var f in opts.filters) {
    //         env.addFilter(f, opts.filters[f]);
    //     }
    // }
    return env;
};

var templating = function(path, opts) {
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        ctx.render = function(view, model) {
            // 把render后的内容赋值给response.body
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));  // Object.assign()将几个参数合并，同属性值后者覆盖前者，
            ctx.response.type = 'text/html';
        }
        await next();
    };
}

module.exports = templating;