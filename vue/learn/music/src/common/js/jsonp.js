import orginalJSONP from 'jsonp'

function param(data){

}

export default function jsonp(url,data,opts){
    url+=((url.indexOf('?')===-1)?'?':'&')+param(data)

    return new Promise((resolve,reject)=>{
        orginalJSONP(url,opts,(err,data)=>{
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}