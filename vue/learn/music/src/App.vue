<template>
   <div id="app">
     <transition name="show">
        <div v-show="isShowIndex">
          <AsideMenu v-show="isShowAsideMenu"></AsideMenu>
          <v-header></v-header>
          <v-nav></v-nav>
          <router-view>
          </router-view>
          <v-footer></v-footer>
        </div>
        </transition>
        <transition name="showIndex">
            <Play v-show="!isShowIndex">
            </Play>
        </transition>
        <audio v-bind:src="audio.src" v-bind:autoplay="isPlaying" ref="audio"></audio>
  </div>
</template>

<script>
import VHeader from './components/Header.vue'
import VFooter from './components/Footer.vue'
import VNav from './components/Nav.vue'
import AsideMenu from './components/AsideMenu.vue'
import Play from './components/Play.vue'
import About from './components/About.vue'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    audio () {
      return this.$store.state.play.audio
    },
    isPlaying () {
      return this.$store.state.asideMenu.isPlaying
    },
    DOM () {
      return this.$store.state.play.DOM
    },
    isShowSearch () {
      return this.$store.state.find.isShowSearch
    },
    isShowIndex () {
      return this.$store.state.play.isShowIndex
    },
    musicData () {
      return this.$store.state.play.musicData
    },
    isShowAsideMenu () {
      return this.$store.state.asideMenu.isShowAsideMenu
    },
    isShowList () {
      return this.$store.state.musicList.isShowList
    }
  },
  components: {
    VHeader,
    VFooter,
    VNav,
    AsideMenu,
    Play,
    About
  },
  mounted () {
    this.$store.commit('findDOM', {name: 'audio', dom: this.$refs.audio})
  }
}
</script>

<style scoped>
.showIndex-enter-active {
  transition: all .4s ease-out;
}
.showIndex-leave-active {
  transition: all 0 ease;
}
.showIndex-enter, .showIndex-leave-active {
  transform: translateY(350px);
  opacity: 0;
}
.show-enter-active {
  transition: all .4s ease;
}
.show-leave-active {
  transition: all 0 ease-out;
}
.show-enter, .show-leave-active {
  transform: translateX(-350px);
  opacity: 0;
}

.down-enter-active {
  transition: all .2s ease-in-out;
}
.down-leave-active {
  transition: all .4s ease-in-out;
}
.down-enter, .down-leave-active {
  transform: translateY(-250px);
  opacity: 0;
}

.show-search-enter-active,
.show-search-leave-active {
    transition: all .3s ease;
}
.show-search-enter {
    transform: translateY(50px);
}
/* 2.1.8以上只能用leave-to */
.show-search-leave-to {
    transform: translateY(600px);
}
.fade-enter-active {
    transition: all .4s ease;
}
.fade-enter {
    opacity: 0;
}
</style>

