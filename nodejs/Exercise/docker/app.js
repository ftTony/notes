const http = require('http');
const PORT = 30010;
const server = http.createServer((req, res) => {
    res.end('Hello Docker');
})

server.listen(PORT, () => {
    console.log('Running on http://localhost:', PORT, 'NODE_ENV', process.env.NODE_ENV)
})