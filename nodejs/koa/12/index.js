const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
    ctx.cookies.set("name", "xiaonengwu", {
        domain: "localhost", // 写cookie所在的域名
        path: "/", // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        httpOnly: false, // 是否只用于http请求中获取
        overwrite: false, // 是否允许重写
    });
    ctx.body = "";
});

app.listen(3000, () => {
    console.log("[demo] cookie is starting at port 3000");
});