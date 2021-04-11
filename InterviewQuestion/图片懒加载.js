/**
 * 死磕 36 个 JS 手写题（搞懂后，提升真的大）
 * https://juejin.cn/post/6946022649768181774
 * 
 * 图片全部加载完成后移除事件监听
 * 加载完的图片，从imgList移除
 * https://zhuanlan.zhihu.com/p/55311726（原理）
 */

let imgList = [...document.querySelectorAll('img')]
let length = imgList.length;

const imgLazyLoad = function(){
    let count = 0;
    return (function(){
        let deleteIndexList = [];
        imgList.forEach((img,index)=>{
            let rect = img.getBoundingClientRect()
            if(rect.top < window.innerHeight){
                img.src = img.dataset.src;
                deleteIndexList.push(index);
                count++;
                if(count === length){
                    document.removeEventListener('scroll',imgList)
                }
            }
        });
        imgList = imgList.filter((img,index)=>!deleteIndexList.includes(index));
    })()
}
document.addEventListener('scroll', imgLazyLoad);