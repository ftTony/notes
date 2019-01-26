<template>
  <div class="my-music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>

    <!-- 顶部歌手名字 -->
    <h1 v-html="title" class="title"></h1>
    <div ref="bgImageRef" :style="bgStyle" class="bg-image">
      <!-- 随机播放全部 -->
      <div ref="playRef" v-show="songs.length>0" @click="playRandom" class="play-wrapper">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <!-- 蒙层 -->
      <div class="filt" ref="filterRef"></div>
    </div>
    <div class="bg-layer" ref="bgLayerRef"></div>

    <my-scroll
      class="list"
      @scroll="scroll"
      ref="scrollRef"
      :data="songs"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
    >
      <div class="song-list-wrapper">
        <my-song-list @select="selectItem" :songs="songs" :rank="rank"></my-song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <my-loading></my-loading>
      </div>
    </my-scroll>
  </div>
</template>
<script>
import MySongList from "@/components/base/MySongList";
import MyScroll from "@/components/base/MyScroll";
import MyLoading from "@/components/base/MyLoading";
import { mapActions } from "vuex";
import { playlistMixin } from "@/common/js/mixin.js";

const TRANSFORMY_RESERVED = 40;

export default {
  mixins: [playlistMixin],
  components: {
    MySongList,
    MyScroll,
    MyLoading
  },
  data() {
    return {
      scrollY: 0
    };
  },
  props: {
    bgImage: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    },
    // 子组件排行奖杯图片
    rank: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // 推层动画逻辑
    scrollY(newVaul) {}
  },
  methods: {
    ...mapActions(["selectPlay", "randomPlay"]),
    handlePlaylist(playlist) {
      let bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.scrollRef.$el.style.bottom = bottom;
      this.$refs.scrollRef.refresh();
    },
    // 返回按钮
    back(){
        this.$router.back();
    },
    // 父子组件传值
    scroll(pos){
        this.scrollY=pos.y
    },
    // 对儿子说：给你这些在vuex中管理的数据
    selectItem(item,index){
        this.selectPlay({
            list:this.songs,
            index
        })
    },
    // 随机播放全部按钮
    playRandom(){
        this.randomPlay({
            list:this.songs
        })
    }
  },
  computed: {
      bgStyle(){
          return `background-image:url(${this.bgImage})`
      }
  },
  created() {
      this.probeType=3
      this.listenScroll=true
  },
  mounted() {
      this.bgImageHeight=this.$refs.bgImageRef.clientHeight
      this.$refs.scrollRef.$el.style.top=`${this.$refs.bgImageRef.clientHeight}px`
  },
  destroyed() {}
};
</script>
<style lang="scss" scoped>
@import "~@/common/scss/const.scss";
@import "~@/common/scss/mymixin.scss";

.my-music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 100;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .song-list-wrapper {
      padding: 20px 30px;
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
