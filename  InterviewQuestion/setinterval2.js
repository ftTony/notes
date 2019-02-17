function setInterval2(callback, interval) {
    let timer
    const now = Date.now
    let startTime = now()
    let endTime = startTime
    const loop = () => {
        timer = window.requestAnimationFrame(loop)
        endTime = now()
        endTime = now()
        if (endTime - startTime >= interval) {
            startTime = endTime = now();
            callback(timer)
        }
    }
    timer = window.requestAnimationFrame(loop)
    return timer;
}

let a=0;
setInterval2(timer=>{
    console.log(1)
    a++
    if(a===3) cancelAnimationFrame(timer);
},1000)