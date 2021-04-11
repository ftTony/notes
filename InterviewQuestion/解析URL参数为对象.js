function parseParam(url){
    const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将?后面的字符串取出来
    const paramsArr = paramsStr.split('&'); // 将字符串以&分割后存到数组中
    let paramsObj = {};
    // 将params存到对象中
    paramsStr.forEach(param =>{
        if(/=/.test(param)){   // 处理有value的参数
            let [key,val] = param.split('=');   // 分割key和value
            val = decodeURIComponent(val); // 解码
            val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

            if(paramsObj.keyOwnProperty(key)){  // 如果对象有key，则添加一个值
                paramsObj[key] = [].concat(paramsObj[key],val);
            }else{  //  如果对象没有这个key，创建key 并设置值
                paramsObj[key] = val;
            }
        }else{
            paramsObj[param] = true;
        }
    });

    return paramsObj;
}