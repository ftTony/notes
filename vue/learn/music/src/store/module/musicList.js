import api from '../../api/'
import axios from 'axios'
export default{
  state: {
    isShowList: false,
    playlistdetail: {},
    privileges: {}
  },
  actions: {
    getPlayList ({commit, state}, id) {
      axios.get(api.playlistdetail, {params: {id: id}}).then((ret) => {
        state.playlistdetail = ret.data.playlist
        state.privileges = ret.data.privileges
      })
    }

  },
  mutations: {

  }
}
