var http = require('http');

http.createServer(function (req, res) {
    console.log(req);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('<h1>Node.js22</h1>');
    res.write('<p>Hello World111</p>');
}).listen(3000);

console.log('HTTP server is listening at port 3000.')