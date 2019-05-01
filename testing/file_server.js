var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录
var root = path.resolve(process.argv[2] || '.');
console.log('static root dir: ' + root);

//创建服务器
var server = http.createServer(function(request, response) {
    // 获取url的path 类似于 '/css/bootstrap.css'
    var pathName = url.parse(request.url).pathname;
    // 初写出错区域 pathname 写成了pathName

    // 获取对应本地文件路径 '/srv/www/css/bootstrap.css
    var filePath = path.join(root, pathName);

    // 获取文件状态：
    fs.stat(filePath, function(err, stats) {
        if (!err && stats.isFile()) {
            console.log('200 ' + request.url);
            response.writeHead(200);
            // 将文件流导向response
            fs.createReadStream(filePath).pipe(response);
        } else if (!err && stats.isDirectory()) {
            // 只打开了127.0.0.1:8080 目录下 检索index.html default.html
            console.log('打开了目录，在目录下检索index.html与default.html');
            filePaths = [
                path.join(root, '/index.html'),
                path.join(root, '/default.html')
            ];
            fs.stat(filePaths[0], function(err, stats) {
                if (!err && stats.isFile()) {
                    response.writeHead(200);
                    fs.createReadStream(filePaths[0]).pipe(response);
                } else {
                    fs.stat(filePaths[1], function(err, stats) {
                        if (!err && stats.isFile()) {
                            response.writeHead(200);
                            fs.createReadStream(filePaths[1]).pipe(response);
                        }
                    });
                }
            });
        } else {
            console.log('404 ' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);
console.log('server is running at http://127.0.0.1:8080/');
