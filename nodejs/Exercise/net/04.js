var net = require('net');

var server = net.createServer();

var sockets = [];

server.on('connection', function (socket) {
    console.log('got a new connection');

    sockets.push(socket);

    socket.on('data', function (data) {
        console.log('got data:', data);
        sockets.forEach(function (otherSocket) {
            if (otherSocket !== sockets) {
                otherSocket.write(data);
            }
        });
    });
});

server.on('error', function (err) {

});

server.on('close', function () {
    console.log('Server closed');
});

server.listen(4001);