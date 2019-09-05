var http = require('http');

var server = new http.Server();
server.on("request", function (req, res) {
    console.log(req)
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('<h1>Node.js</h1>');
    res.write('<h1>Hello World</h1>');
});
server.listen(3000);

console.log('HTTP server is listening at port 3000.')