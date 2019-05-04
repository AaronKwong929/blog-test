const fs = require('fs');
var addMapping = function(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
};

var addControllers = function(router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter(f => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`processing controller: ${f}`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
};

module.exports = function(dir) {
    let controllers_dir = dir || 'controllers', //不传参数默认为controllers文件夹
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
