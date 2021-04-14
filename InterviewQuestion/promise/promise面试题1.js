// 实现 mergePromise 函数，把传进去的函数数组按顺序先后执行，并且把返回的数据先后放到数组 data 中。
const timeout = ms=>new Promise(resolve=>{
    setTimeout(()=>{resolve()},ms);
});

const ajax1 =()=>timeout(5000).then(()=>{
    console.log('1');
    return 1;
})
const ajax2 =()=>timeout(1000).then(()=>{
    console.log('2');
    return 2;
})
const ajax3 =()=>timeout(2000).then(()=>{
    console.log('3');
    return 3;
})
const mergePromise =async urls =>{
    let arr = [];

    // 并发执行
    const textPromises = urls.map(url =>{
        return url();
    });

    // 按次序输出
    for(const textPromise of textPromises){
        arr.push(await textPromise);
    }

    return arr;
}

mergePromise([ajax1,ajax2,ajax3]).then(data =>{
    console.log('done');
    console.log(data);
})