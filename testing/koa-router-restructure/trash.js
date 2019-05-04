/*
var files = fs.readdirSync(__dirname + '/controllers');

var js_files = files.filter(f => {
    return f.endsWith('.js');
});

for (var f of js_files) {
    console.log(`processing controller: ${f}`);
    let mapping = require(__dirname + '/controllers/' + f);  // require()一个.js文件会读取module.exports暴露出来的东西？
    for (url in mapping) {
        if (url.startsWith('GET')) {
            var path = url.substring(4);  // 取'GET '后面的东西
            router.get(path, mapping[url]);  // '/'为例，取得映射？
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}
*/
/*
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


addControllers(router);
*/