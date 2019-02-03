<template>
  <transition name="list-fade">
    <div class="my-playlist" @click="hide" v-show="showFlag">
      <div class="list-wrapper" @click.stop>
        
        <!-- 头部操作 -->
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>

        <!-- 中部列表 -->
        <my-scroll ref="scrollRef" :data="sequenceList" class="list-content" :refreshDelay="refreshDelay">
            <transition-group name="list" tag="ul">
                <li :key="item.id" class="item" ref="listRef" v-for="(item,index) in sequenceList" @click="selectItem(item,index)">
                    <i class="current" :class="getCurrentIcon(item)"></i>

                    <span class="text">{{item.name}}</span>

                    <span class="like" @click.stop="toggleFavoriteCls(item)">
                        <i :class="getFavoriteCls(item)"></i>
                    </span>

                    <span class="delete" @click.stop="deleteOne(item)">
                        <i class="icon-delete"></i>
                    </span>
                </li>
            </transition-group>
        </my-scroll>

        <div class="list-operate">
            <div class="add" @click="showAddSong">
                <i class="icon-add"></i>
                <span class="text">添加歌曲到队列</span>
            </div>
        </div>

        <div class="list-close" @click="hide">
            <span>关闭</span>
        </div>
      </div>

        <my-confirm ref="confirmRef" @confirm="confirm" @cancel="cancel"></my-confirm>

        <my-add-song ref="addSongRef"></my-add-song>
    </div>
  </transition>
</template>
<script>
import MyScroll from "@/components/base/MyScroll";
import MyConfirm from "@/components/base/MyConfirm";
import MyAddSong from "@/components/MyAddSong";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { myArray } from "@/common/js/myutils.js";

export default {
  components: {
    MyScroll,
    MyConfirm,
    MyAddSong
  },
  data() {
    return {
      showFlag: false,
      refreshDelay: 100
    };
  },
  props: {},
  watch: {
    currentSong(newVal, oldVal) {
      if (!newVal.id || !oldVal.id) return;

      if (!this.showFlag || newVal.id === oldVal.id) return;

      this.scrollToCurrent(newVal);
    }
  },
  methods: {
    ...mapMutations({
      setMode: "SET_MODE",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayingState: "SET_PLAYING_STATE",
      setPlayList: "SET_PLAYLIST"
    }),
    ...mapActions([
      "deleteSong",
      "deleteSongList",
      "savefavoriteList",
      "delfavoriteList"
    ]),
    toggleFavoriteCls(song) {
      if (this._isFavorite(song)) {
        this.delfavoriteList(song);
      } else {
        this.savefavoriteList(song);
      }
    },
    getFavoriteCls(song) {
      if (this._isFavorite(song)) {
        return "icon-favorite";
      } else {
        return "icon-not-favorite";
      }
    },
    _isFavorite(song) {
      let index = this.favoriteList.findIndex(index => {
        return song.id === item.id;
      });
      return index > -1;
    },
    show() {
      this.showFlag = true;

      // 延迟计算better-scroll
      setTimeout(() => {
        this.$refs.scrollRef.refresh();
      }, 20);

      this.scrollToCurrent(this.currentSong);
    },
    hide() {
      this.showFlag = false;
    },
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return "icon-play";
      }
      return "";
    },
    //   切歌
    selectItem(item, index) {
      // 随机播放
      if (this.mode === 2) {
        index = this.playlist.findIndex(song => {
          return song.id === item.id;
        });
      }

      this.setCurrentIndex(index);

      // 如果是暂停，切歌后自动播放
      this.setPlayingState(true);
    },
    // 切歌后滚动至第一个
    scrollToCurrent(current) {
      let index = this.sequenceList.findIndex(song => {
        return song.id === current.id;
      });

      this.$refs.scrollRef.scrollToElement(this.$refs.listRef[index], 300);
    },
    // 删除图标
    deleteOne(item) {
      this.deleteSong(item);
      if (!this.playlist.length) {
        this.showFlag = false;
      }
    },
    showConfirm() {
      this.$refs.confirmRef.show();
    },
    // confirm清空对话框
    confirm() {
      this.deleteSongList();
    },
    cancel() {
      return;
    },
    // 改变播放模式，实质是修改playlist
    changeMode() {
      let mode = (this.mode + 1) % 3;
      this.setMode(mode);

      let newList = null;
      if (mode === 2) {
        // 随机播放
        newList = myArray.shuffle(this.sequenceList);
      } else {
        // 顺序播放、单曲循环
        newList = this.sequenceList;
      }

      // 调整当前歌曲的索引
      let index = newList.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
      this.setPlayingState(newList);
    },
    showAddSong() {
      this.$refs.addSongRef.show();
    }
  },
  filters: {},
  computed: {
    ...mapGetters([
      "sequenceList",
      "currentSong",
      "mode",
      "playlist",
      "favoriteList"
    ]),
    //   播放模式对应图标字体
    iconMode() {
      let cls = "";
      if (this.mode === 0) {
        cls = "icon-sequence";
      } else if (this.mode === 1) {
        cls = "icon-loop";
      } else if (this.mode === 2) {
        cls = "icon-random";
      } else {
        cls = "";
      }
      return cls;
    },
    // 播放模式文案
    modeText() {
      let mode = "";
      if (this.mode === 0) {
        mode = "顺序播放";
      } else if (this.mode === 1) {
        mode = "单曲播放";
      } else if (this.mode === 2) {
        mode = "随机播放";
      } else {
        mode = "";
      }
      return mode;
    }
  },
  created() {},
  mounted() {},
  destroyed() {}
};
</script>
<style lang="scss" scoped>
@import "~@/common/scss/const.scss";
@import "~@/common/scss/mymixin.scss";

.my-playlist {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter,
  &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width:100%;
    background-color: $color-highlight-background;
    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 10px;
          font-size: 30px;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        &.list-enter-active,
        &.list-leave-active {
          transition: all 0.1s;
        }
        &.list-enter,
        &.list-leave-to {
          height: 0;
        }
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        &.list-enter-active,
        &.list-leave-active {
          transition: all 0.1s;
        }
        &.list-enter,
        &.list-leave-to {
          height: 0;
        }
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }
        .like {
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;
          .icon-favorite {
            color: $color-sub-theme;
          }
        }
        .delete {
          @include extend-click();
          font-size: $font-size-small;
          color: $color-theme;
        }
      }
    }
    .list-operate {
      width: 140px;
      margin: 20px auto 30px auto;
      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;
        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }
        .text {
          font-size: $font-size-small;
        }
      }
    }
    .list-close {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>
