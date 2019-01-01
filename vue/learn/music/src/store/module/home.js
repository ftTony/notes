import api from '../../api/'
import axios from 'axios'
export default{
  state: {
    bannerList: [],
    songList: [],
    privatecontentList: []
  },
  actions: {
    getBannerList ({commit}) {
      axios.get(api.banner, {}).then((ret) => {
        commit('GET_BANNER_LIST', {list: ret.data.banners})
      }, (err) => {
        console.log(err)
      })
    },
    getSongList ({commit}) {
      axios.get(api.personalizedSong, {}).then((ret) => {
        commit('GET_SONG_LIST', {list: ret.data.result.slice(0, 6)})
      }, (err) => {
        console.log(err)
      })
    },
    getPrivatecontentList ({commit}) {
      axios.get(api.personalizedPrivatecontent, {}).then((ret) => {
        commit('GET_PRIVATECONTENT_LIST', {list: ret.data.result.slice(0, 6)})
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    GET_BANNER_LIST: function (state, {list}) {
      state.bannerList = list
    },
    GET_SONG_LIST: function (state, {list}) {
      state.songList = list
    },
    GET_PRIVATECONTENT_LIST: function (state, {list}) {
      state.privatecontentList = list
    }
  }
}
