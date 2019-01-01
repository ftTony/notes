import api from '../../api/'
import axios from 'axios'

export default{
  state: {
    skinColor: localStorage.skinColor || '#B72712',
    musicData: [],
    isPlaying: false,
    DOM: {},
    audio: {
      name: '',
      src: '',
      musicImgSrc: '',
      index: 0
    },
    isShowIndex: true,
    isShowMiniMusic: true
  },
  mutations: {
    findDOM (state, payload) {
      state.DOM[payload.name] = payload.dom
    },
    toggleMusic (state, index) {
      if (state.musicData.length !== 0) {
        state.audio.name = state.musicData[index].name
        state.audio.musicImgSrc = state.musicData[index].picUrl
        state.audio.src = state.musicData[index].src
        state.audio.index = index
      }
    },
    play (state, flag) {
      state.isPlaying = flag
    },
    showIndex (state, flag) {
      state.isShowIndex = flag
    },
    showMiniMusic (state, flag) {
      state.isShowMiniMusic = flag
    },
    changeSkinColor (state, color) {
      state.skinColor = color
    }
  },
  actions: {
    getData ({commit, state}) {
      if (localStorage.musics !== '[]' && localStorage.musics) {
        state.musicData = JSON.parse(localStorage.musics)
        return false
      } else {
        axios.get(api.newsong, {params: {}}).then((ret) => {
          var tmp = []
          var ids = ''
          ret.data.result.forEach(item => {
            var obj = {}
            obj.name = item.name
            obj.picUrl = item.song.album.picUrl
            obj.id = item.id
            ids += item.id + ','
            tmp.push(obj)
          })
          ids = ids.substring(0, ids.length - 1)
          return {arr: tmp, ids: ids}
        }).then((result) => {
          this.dispatch('getDetail', result.ids).then((ret) => {
            ret.forEach((item, index) => {
              result.arr[index]['src'] = item.url
            })
            state.musicData = result.arr
            commit('toggleMusic', 0)
          })
        })
      }
    },
    getDetail ({state}, ids) {
      return axios.get(api.play, {params: {id: ids}}).then((ret) => {
        return ret.data.data
      })
    }
  }
}
