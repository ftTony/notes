<template>
  <transition name="slide">
    <my-music-list class="my-song-list-detail" :songs="songs" :title="title" :bg-image="bgImage"></my-music-list>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import MyMusicList from "@/components/MyMusicList";
import { getSongList } from "@/api/recommend.js";
import { createSingerSong } from "@/common/js/SingerSongClass.js";
import { getSongVkey } from "@/api/singer.js";
export default {
  components: {
    MyMusicList
  },
  data() {
    return {
      songs: []
    };
  },
  props: {},
  watch: {},
  filters: {},
  methods: {
    // 获取歌曲单数据
    _getSongList() {
      // 禁止直接刷新详情页（获取不到歌单id）
      if (!this.songlist.dissid) {
        this.$router.push("/recommend");
        return;
      }
      getSongList(this.songlist.dissid).then(res => {
       // 计算表达式的值
        function evil(fn) {
          var Fn = Function  // 一个变量指向Function，防止有些前端编译工具报错
          return new Fn('return ' + fn)()
        }
        var self = this
        window.jsonCallback = function(res) {
          if (res.code === 0) {
            self.songs = self._formatSongs(res.cdlist[0].songlist)
          }
        }
        evil(res)
      });
    },
    // 重组res.cdlist[0].songlist数据
    _formatSongs(list){
        let result=[]
        list.forEach((item)=>{
            getSongVkey(item.songmid).then((res)=>{
                const vkey=res.data.items[0].vkey
                if(item.songid && item.albummid){
                    result.push(createSingerSong(item,vkey))
                }
            })
        })
        return result
    }
  },
  computed:{
      ...mapGetters(['songlist']),
    //   传入子组件
      title(){
            return this.songlist.dissname
      },
      bgImage(){
          return this.songlist.imgurl
      }
  },
  created(){
      this._getSongList()
  },
  mounted(){},
  destroyed(){}
};
</script>
<style lang="scss" scoped>
@import "~@/common/scss/const.scss";
@import "~@/common/scss/mymixin.scss";

.my-song-list-detail {
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
