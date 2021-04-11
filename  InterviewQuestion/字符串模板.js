// 第一版
function render(template,data){
    const reg = /\{\{\(\w+)}\}/; // 模板字符串正则
    if(reg.test(template)){ // 判断模板里是否有模板字符串
        const name = reg.exec(template)[1];   // 查找当前模板里第一个模板字符串的字段
        template = template.replace(reg,data[name]);   // 将第一个模板字符串渲染
        return render(template,data);   // 递归的渲染并返回渲染后的结构
    }
    return template;    // 如果模板没有模板字符串直接返回
}

// 第二版 https://segmentfault.com/a/1190000013516128
function render(template,context){
    return template.replace(/\{\{(.*?)\}\}/g,(match,key)=>context[key]);
}