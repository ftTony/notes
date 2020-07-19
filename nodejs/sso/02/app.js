const http = require("http");
const Koa=require('koa');
const Router = require('koa-router');
const koabody = require('koa-body');
const request = require('request-promise');
const path =require('path')
const fs = require("fs")
let app = new Koa();
app.use(koabody({}));

let router = new Router()

const config = {
    sso_url:'http://kylin.dev.xsyxsc.cn/',
    client_id:'xnw',
    scope:'api1 openid',
    response_type:'code',
    state:(new Date()).getTime()
}

let id_token = ''

router.get('/', async ( ctx )=>{
    let token = ctx.cookies.get('token')
    let param = ctx.query
    if(!token &&!param.code){
        let callbackUrl = `${config.sso_url}connect/authorize?client_id=${config.client_id}&redirect_uri=https://${ctx.request.host}&response_type=${config.response_type}&scope=${config.scope}&state=${config.state}`
        ctx.redirect(callbackUrl); 
    }
    else if(!token && param.code){
    let options = {
        method: 'POST',
        url: `${config.sso_url}auth/token`,
        body: {
            "code": param.code,
            "client_id": config.client_id,
            "redirect_uri": `https://${ctx.request.host}`
        },
        json: true
    };
    let res = await request(options)
    ctx.status = 302; 
    id_token = res.data.id_token
    ctx.redirect(`https://${ctx.request.host.replace('www','sso')}?token=${res.data.access_token}`)
    }
    else{
        try{
        let res = await request.get({url:`${config.sso_url}User/GetCurrentUser`,headers: {authorization:`Basic ${token}`}})
        ctx.cookies.set('user_name',JSON.parse(res).data.userName,{
            //   domain:'localhost',
            path:'/',   //cookie写入的路径
            // maxAge:1000*60*60*1,
            expires:new Date((new Date()).getTime()+1000*60*60*24*365), // cookie失效时间
            httpOnly:false,
            overwrite:false,
        });
        ctx.body= fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
        } catch(err){
        ctx.cookies.set('token','',{signed:false,maxAge:0});
        let callbackUrl = `${config.sso_url}auth/authorize?client_id=${config.client_id}&redirect_uri=https://${ctx.request.host}&response_type=${config.response_type}&scope=${config.scope}&state=${config.state}`
        ctx.redirect(callbackUrl); 
        }    
    }
 })

 router.get('/sso', async ( ctx )=>{
    let params = ctx.query
    ctx.cookies.set('token',params.token,{
        //   domain:'localhost',
        path:'/',   //cookie写入的路径
        // maxAge:1000*60*60*1,
        expires:new Date((new Date()).getTime()+1000*60*60*24*365), // cookie失效时间
        httpOnly:false,
        overwrite:false,
    });
    ctx.status = 302; 
    ctx.redirect(`https://${ctx.request.host.replace('sso','www')}`); 
});

router.get('/logout', async ( ctx )=>{
    ctx.cookies.set('token','',{signed:false,maxAge:0});
    ctx.status = 302; 
    ctx.redirect(`${config.sso_url}auth/logOut?id_token=${id_token}&post_logout_redirect_uri=https://${ctx.request.host}`); 
});

router.get('/api', async ( ctx )=>{
    let user_name = ctx.cookies.get('user_name')
    if(user_name){
        ctx.body={
            code:0,
            data:{
                id:100001,
                name:user_name
            }
        }
    }else{
        ctx.body={
            code:401,
            message:'登录失效'
        }
    }
});
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
http.createServer(app.callback()).listen(3001);