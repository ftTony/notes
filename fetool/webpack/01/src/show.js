// 操作DOM元素，把content显示到网页上
function show(content){
    window.document.getElementById('app').innerText='Hello,'+content;
}

module.exports=show;