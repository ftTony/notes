<template>
  <transition name="slide" class="my-rank-detail">
    <my-music-list :songs="songs" :title="title" :bg-image="bgImage" :rank="true"></my-music-list>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import { getRankDetail } from "@/api/rank.js";
import { getSongVkey } from "@/api/singer.js";
import { createSingerSong } from "@/common/js/SingerSongClass.js";
import MyMusicList from "@/components/MyMusicList";

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
    // 获取指定排行榜单详情
    _getRankDetail() {
      // 禁止直接刷新详情页（获取不到排行id）
      if (!this.rankList.id) {
        this.$router.push("/rank");
        return;
      }

      getRankDetail(this.rankList.id).then(res => {
        if (res.code === 0) {
          this.songs = this._formatSongs(res.songlist);
        }
      });
    },
    // 重组res.songlist数据
    _formatSongs(list) {
      let result = [];

      list.forEach(item => {
        let { data } = item;
        getSongVkey(data.songmid).then(res => {
          const vkey = res.data.items[0].vkey;
          if (data.songid && data.albummid) {
            result.push(createSingerSong(data, vkey));
          }
        });
      });

      return result;
    }
  },
  computed: {
    ...mapGetters(["rankList"]),
    title() {
      return this.rankList.topTitle;
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].img;
      }
    }
  },
  created() {
    this._getRankDetail();
  },
  mounted() {},
  destroyed() {}
};
</script>
<style lang="scss" scoped>
@import "~@/common/scss/const.scss";
@import "~@/common/scss/mymixin.scss";

.slide-enter-active,
slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
