const koa = require('koa');
const loggerAsync = require('./middleware/logger-async');
const app = new koa;

app.use(loggerAsync())
app.use(async (ctx) => {
    ctx.body = 'hello koa2'
})

app.listen(3000);

console.log('[demo] start-quick is starting at port 3000')