import jsonp from '@/common/js/jsonp'
import {commonParams,opts} from '@/api/common-query.js'

/**
 * jsonp 抓取歌手页数据
 */
export function getSingerList(){
    let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    let data=Object.assign({},commonParams,{
        channel:'singer',
        page:'list',
        key:'all_all_all',
        pagesize:100,
        pagenum:1,
        g_tk: 1576475597,
        hostUin:0,
        platform:'yqq',
        needNewCode:0
    })
    return jsonp(url,data,opts)
}

export function getSongVkey(songmid){
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
    const data=Object.assign({},{
        callback: 'musicJsonCallback',
        loginUin: 3051522991,
        format: 'jsonp',
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        uin: 3051522991,
        guid: 5931742855,
        songmid: songmid,
        filename: `C400${songmid}.m4a`
    })
    return jsonp(url,data)
}

/**
 * 
 * @param {*} singermid 
 */
export function getSingerDetail(singermid){
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    let data=Object.assign({},commonParams,{
        g_tk: 1576475597,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        order: 'listen',
        begin: 0,
        num: 100,
        songstatus: 1,
        singermid: singermid
    })
    return jsonp(url,data,opts)
}