// 第一个http服务器程序
var http = require('http');

var server = http.createServer(function (request, response) {
    console.log(request.method + ':' + request.url);
    response.writeHead(200, {'Content-type': 'text/html'});
    response.end('<h1>hello world!</h1>');
});

server.listen(8080);

console.log('server is running at http://127.0.0.1:8080/');