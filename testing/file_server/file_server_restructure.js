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
        if (!err && stats.isDirectory()) {
            console.log('进入了文件目录，检索index.html, default.html');
            filePaths = [
                path.join(root, '/index.html'),
                path.join(root, '/default.html')
            ];
            if (fs.existsSync(filePaths[0])) {
                console.log('located index.html');
                console.log('200 /index.html');
                response.writeHead(200);
                fs.createReadStream(filePaths[0]).pipe(response);
            } else if (fs.existsSync(filePaths[1])) {
                console.log('located default.html');
                console.log('200 /default.html');
                response.writeHead(200);
                fs.createReadStream(filePaths[1]).pipe(response);
            } else {
                console.log('index.html and default.html not exist.\nconsole exit.');
                process.exit();
            }
        } else if (!err && stats.isFile()) {
            console.log('entered index.html');
            console.log('200 ' + request.url);
            response.writeHead(200);
            fs.createReadStream(filePath).pipe(response);
        } else {
            console.log('error1');
        }
    });
});

server.listen(8080);
console.log('server is running at http://127.0.0.1:8080/');
