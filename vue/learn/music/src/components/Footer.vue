<template>
   <transition name="fade">
    <div v-show="isShowMiniMusic" :style="{backgroundColor: skinColor}" class="footer">
      <div class="mini-music">
        <div class="music-img">
          <img @click="showPlay" v-bind:src="audio.musicImgSrc+'?imageView&thumbnail=360y360&quality=75&tostatic=0'" ref="img">
        </div>
        <div class="music-name">
          <p @click="showPlay">{{audio.name}}</p>
          <div class="progress">
            <span class="start">{{transformTime(now)}}</span>
            <div @click="changeTime($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" ref="progressBar" class="progress-bar">
              <div class="now" ref="now" :style="{width: (now / nativeAudio.duration).toFixed(3)*100 + '%'}"></div>
            </div>
            <span class="end" v-text="totalTime"></span>
          </div>
        </div>
        <div class="music-control">
          <i @click="play()" v-bind:class="[isPlaying ? pauseIcon : playIcon]"></i>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
//   name: 'footer',
  data () {
    return {
      playIcon: 'play-icon',
      pauseIcon: 'pause-icon',
      now: 0,
      nativeAudio: {},
      totalTime: '0:00',
      defaultImg: 'https://microzz.com/img/avatar.jpg'
    }
  },
  computed: {
    isPlaying () {
      return this.$store.state.play.isPlaying
    },
    isShowAsideMenu () {
      return this.$store.state.asideMenu.isShowAsideMenu
    },
    audio () {
      return this.$store.state.play.audio
    },
    DOM () {
      return this.$store.state.play.DOM
    },
    musicData () {
      return this.$store.state.play.musicData
    },
    skinColor () {
      return this.$store.state.play.skinColor
    },
    isShowMiniMusic () {
      return this.$store.state.play.isShowMiniMusic
    }
  },
  mounted () {
    this.nativeAudio = document.querySelector('audio')
    this.nativeAudio.addEventListener('play', () => {
      this.totalTime = this.transformTime(this.nativeAudio.duration)
      this.now = this.nativeAudio.currentTime
      setInterval(() => {
        this.now = this.nativeAudio.currentTime
      }, 1000)
    })
  },
  methods: {
    play () {
      this.$store.commit('play', !this.isPlaying)
      !this.isPlaying ? this.DOM.audio.pause() : this.DOM.audio.play()
    },
    showPlay () {
      if (this.isShowAsideMenu) return false
      this.$store.commit('showIndex', false)
      this.$store.commit('showMiniMusic', false)
    },
    touchMove (event) {
      let progressBar = this.$refs.progressBar
      let coordStart = progressBar.getBoundingClientRect().left
      let coordEnd = event.touches[0].pageX
      this.$refs.now.style.width = ((coordEnd - coordStart) / progressBar.offsetWidth).toFixed(3) * 100 + '%'
    },
    touchEnd (event) {
      this.nativeAudio.currentTime = this.$refs.now.style.width.replace('%', '') / 100 * this.nativeAudio.duration
      this.now = this.nativeAudio.currentTime
      this.nativeAudio.play()
      this.$store.commit('play', true)
    },
    transformTime (seconds) {
      let m, s
      m = Math.floor(seconds / 60)
      m = m.toString().length === 1 ? ('0' + m) : m
      s = Math.floor(seconds - 60 * m)
      s = s.toString().length === 1 ? ('0' + s) : s
      return m + ':' + s
    }
  }
}
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: all .3s ease-in-out;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-active {
  transform: translateY(50px);
  opacity: 0;
}
  .footer {
    background: #B72712;
    width: 100%;
    height: 70px;
    text-align: center;
    position: fixed;
    bottom: 0;
max-width: 750px;
    .mini-music {
      display: flex;
      height: 70px;
      line-height: 70px;

      .music-img {
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 70px;
          height: 70px;
          border-radius: 35px;
          background-size: contain;
          cursor: pointer;
        }
      }
      .music-name {
        flex: 5;
        color: white;
        overflow: hidden;
        position: relative;
        width: 100%;

        p {
          position: relative;
          z-index: 1;
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          white-space: nowrap;
          // cursor: pointer;
        }
        .progress {
          position: absolute;
          width: 100%;
          top: 10px;
          left: 0;
          span.start {
            position: absolute;
            left: 6px;
            // padding-right: 5px;
          }
          span.end {
            position: absolute;
            right: 4px;
            // padding-left: 5px;
          }
          @media screen and(min-width: 600px) {
            span.start {
              position: absolute;
              left: 26px;
            }
            span.end {
              position: absolute;
              right: 30px;
            }
          }
          .progress-bar {
            position: relative;
            width: 50%;
            height: 5px;
            display: inline-block;
            background-color: rgba(255, 255, 255, .5);
            vertical-align: 2px;
            border-radius: 3px;
            cursor: pointer;

            .now {
              position: absolute;
              left: 0;
              display: inline-block;
              max-width: 100%;
              // width: 70%;
              height: 5px;
              background-color: #31c27c;
            }
            .now::after {
              content: "";
              position: absolute;
              left: 100%;
              width: 2px;
              height: 6px;
              background-color: white;
            }
          }
        }
      }
      .music-control {
        flex: 1.5;
        i {
          padding-right: 10px;
          width: 45px;
          height: 45px;
          margin-top: 13px;
          display: inline-block;
          cursor: pointer;
          border-radius: 22px;
        }
        .play-icon {
          background: url(../images/play.svg) no-repeat;
          background-size: contain;

        }
        .pause-icon {
          background: url(../images/pause.svg) no-repeat;
          background-size: contain;
        }
      }
    }
  }
</style>