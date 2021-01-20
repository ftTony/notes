// https://libin1991.github.io/2019/02/06/%E4%B8%80%E9%81%93%E8%B5%8B%E5%80%BC%E9%9D%A2%E8%AF%95%E9%A2%98%E5%BC%95%E5%8F%91%E7%9A%84%E6%80%9D%E8%80%833%E3%80%90%E5%B9%B6%E5%8F%91%E6%95%B0%E6%8E%A7%E5%88%B6%E3%80%91/
// https://juejin.cn/post/6844903796506624014

function handleFetchQueue(urls,max,callback){
    const urlCount = urls.length;
    const requestQueue = [];
    const results = [];
    let i = 0;
    const handleRequest = (url) =>{
        const req = fetch(url).then(res =>{
            console.log('当前并发：' + requestQueue);
            const len = results.push(res);
            if(len<urlCount && i+1<urlCount){
                requestQueue.shift();
                handleRequest(urlsp[++i]);
            }else if(len === urlCount){
                'function' === typeof callback && callback(results);
            }
        }).catch(e =>{
            results.push(e);
        });
        if(requestQueue.push(req)<max){
            handleRequest(urls[++i]);
        }
    }
    handleRequest(urls[i]);
}

const urls = Array.from({length:10},(v,k)=>k);

const fetch = function(idx){
    return new Promise(resolve =>{
        console.log(`start request ${idx}`);
        const timeout = parseInt(Math.random() * 1000);
        setTimeout(()=>{
            console.log(`end request ${idx}`);
            resolve(idx);
        },timeout);
    });
}