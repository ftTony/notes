// https://libin1991.github.io/2019/02/06/%E4%B8%80%E9%81%93%E8%B5%8B%E5%80%BC%E9%9D%A2%E8%AF%95%E9%A2%98%E5%BC%95%E5%8F%91%E7%9A%84%E6%80%9D%E8%80%833%E3%80%90%E5%B9%B6%E5%8F%91%E6%95%B0%E6%8E%A7%E5%88%B6%E3%80%91/
// https://juejin.cn/post/6844903796506624014


// 代码一
function handleFetchQueue(urls,max,callback){
    const urlCount = urls.length;
    const requestQueue = [];
    const results = [];
    let i = 0;
    const handleRequest = (url) =>{
        const req = fetch(url).then(res =>{
            const len = results.push(res);
            if(len<urlCount && i+1<urlCount){
                requestQueue.shift();
                handleRequest(urls[++i]);
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
        const timeout = parseInt(Math.random() * 10000);
        console.log(`timeout:${timeout}`);
        console.log(`=============`);
        setTimeout(()=>{
            console.log(`end request ${idx}`);
            resolve(idx);
        },timeout);
    });
}

const max = 4;
const callback = ()=>{
    console.log('run callback');
}

handleFetchQueue(urls,max,callback);

// // 代码二
// /**
//  * 
//  * @param {*} list 要迭代的数组
//  * @param {*} limit 并发数量控制数
//  * @param {*} asyncHandle 
//  */
// function mapLimit(list,limit,asyncHandle){
//     function recursion(arr){
//         return asyncHandle(arr.shift()).then(()=>{
//             if(arr.length !==0) 
//             {
//                 return recursion(arr);  // 数组还未迭代完，递归继续进行迭代
//             }else{
//                 return 'finish';
//             }
//         });
//     }
//     let listCopy = [].concat(list);
//     let asyncList = []; // 正在进行的所有迸发异步操作

//     while(limit--){
//         asyncList.push(recursion(listCopy));
//     }
//     return Promise.all(asyncList);  // 所有并发异步操作都完成后，本次并发控制迭代完成
// }

// // 测试
// let dataLists = [1,2,3,4,5,6,7,8,9,11,100,123];
// let count = 0;
// mapLimit(dataLists,3,function(curItem){
//     return new Promise(resolve =>{
//         count++;
//         setTimeout(()=>{
//             console.log(curItem,'当前并发量：',count--);
//             resolve();
//         },Math.random()*1000);
//     });
// }).then(response =>{
//     console.log('finish',response);
// });