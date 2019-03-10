const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router');
const fs = require('fs');
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const port = 8081


// 首页路由
let router = new Router();
router.get('/', ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
})

app.use(router.routes());

io.on('connection', socket => {
    console.log('socket初始始化完成');
    socket.on('say', data => {
        console.log(data, '接收到的信息')
        socket.emit('message', { hell: '你是谁' })
    })
})


app.listen(process.env.PORT || port, () => {
    console.log(`app run at : http://127.0.0.1:${port}`);
});