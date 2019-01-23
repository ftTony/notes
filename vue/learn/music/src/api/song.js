import axios from 'axios'
import {
    commonParams
} from '@/api/common-query.js'

export function getLyric(mid) {
    let url = '/api/getLyric'
    let data = Object.assign({}, commonParams, {
        songmid: mid,
        format: 'json',
        pcachetime: +new Date(),
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch((err) => {
        console.log(err)
    })
}