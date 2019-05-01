var 
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录
var root = path.resolve(process.argv[2] || '.'); 

console.log('static root dir: ' + root);

//创建服务器 

var server = http.createServer(function (request, response) {
    // 获取url的path 类似于 '/css/bootstrap.css'
    var pathName = url.parse(request.url).pathname;
    // 初写出错区域 pathname 写成了pathName

    // 获取对应本地文件路径 '/srv/www/css/bootstrap.css
    var filePath = path.join(root, pathName);

    // 获取文件状态：
    fs.stat(filePath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错而且文件存在
            console.log('200 ' + request.url);
            // 发送200相应
            response.writeHead(200);
            // 将文件流导向response
            fs.createReadStream(filePath).pipe(response);
        } else {
            console.log('404 ' + request.url);
            // 发送404响应
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);
console.log('server is running at http://127.0.0.1:8080/')


