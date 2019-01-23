import storage from 'good-storage';

const SEARCH_KEY = '__search__';

/**
 * 插入新元素到arr[0]并删除重复值，可控制数组最大长度
 * @param {*} arr   要插入到哪个数组
 * @param {*} val   要插入的值
 * @param {*} compareFn    比较函数
 * @param {*} maxLen    数组最大长度
 */
function insertArr(arr, val, compareFn, maxLen = 15) {
    let index = arr.findIndex(compareFn)
    if (index === 0) return;
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

function delArr(arr, compareFn) {
    let index = arr.findIndex(compareFn)
    if (index > -1) {
        arr.splice(index, 1)
    }
}

//获取
export function getStorage() {
    return storage.get(SEARCH_KEY, []);
}

//增加
export function localSave(query) {
    // 当前localstorage数组
    let searches = storage.get(SEARCH_KEY, [])

    insertArr(searches, query, (item) => {
        return item === query
    }, 15);

    storage.set(SEARCH_KEY, searches)
    return searches;
}

// 删除
export function localDel(query) {
    let searches = storage.get(SEARCH_KEY, [])

    delArr(searches, (item) => {
        return item === query
    })

    storage.set(SEARCH_KEY, searches)
    return searches
}

// 清空
export function localClear(query) {
    storage.remove(SEARCH_KEY)
    return []
}

// 最近播放localstorage
const PLAY_KEY = '__play__'

// 获取
export function getPlayStorage() {
    return storage.get(PLAY_KEY, [])
}

// 增加
export function savePlay(song) {
    // 当前localstorage数组
    let songs = storage.get(PLAY_KEY, [])

    insertArr(songs, song, (item) => {
        return item.id === song.id
    }, 50)

    storage.set(PLAY_KEY, songs)
    return songs
}

// 最近播放localstorage
const FAVORITE_KEY = '__favorite__'

// 获取
export function getFavorite() {
    return storage.get(FAVORITE_KEY, [])
}

// 增加
export function saveFavorite(song) {
    // 当前localstorage数组
    let songs = storage.get(FAVORITE_KEY, [])

    insertArr(songs, song, (item) => {
        return item.id === song.id
    }, 50)
    storage.set(FAVORITE_KEY, songs)
    return songs;
}

export function delFavorite(song) {
    // 当前localstorage数组
    let songs = storage.get(FAVORITE_KEY, [])

    delArr(songs, (item) => {
        return item.id === song.id
    })
    storage.set(FAVORITE_KEY, songs);
    return songs;
}