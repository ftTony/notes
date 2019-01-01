
<template>
    <div class="com-body-top">
        <!-- <loading :isLoading="isLoading"></loading> -->
        <mt-swipe :auto="40000">
            <mt-swipe-item v-for="(item, index) in bannerList" :key=index>
                <a :href="item.url" class="swipe-item"> <img :src='item.pic'></a>
            </mt-swipe-item>
        </mt-swipe>
    
  <nav class="index-nav">
        <router-link :to="'/'"  class="nav-item">
            <img src="../images/fm.png" class="nav-top" />
            <p>私人FM</p>
        </router-link>
        <router-link :to="'/'" class="nav-item">
            <div class="nav-top nav-text">16</div>
            <p>每日推荐</p>
        </router-link>
        <router-link :to="'/'" class="nav-item">
            <img src="../images/song.png" class="nav-top" />
            <p>歌曲</p>
        </router-link>

        <router-link :to="'/'" class="nav-item">
            <img src="../images/ranking.png" class="nav-top" />
            <p>排行榜</p>
        </router-link>
    </nav>

    <div class="recommend-box">
        <h2 class="h2">
            <span>推荐歌单</span>
            <a href="javascript:;" class="more-btn">更多></a>
        </h2>
        <div class="song-list clearfix">
            <router-link :to="{name:'musicList',params:{id:item.id}}" class="song-items" v-for="(item, index) in songList" :key=index>
                <div class="img-box">
                    <img :src="item.picUrl+'?imageView&thumbnail=360y360&quality=75&tostatic=0'" alt="" />
                </div>
                <p class="songs-der com-two-overflow">{{item.name}}</p>
            </router-link>
        </div>
    </div>
    <div class="recommend-box">
        <h2 class="h2">
            <span>独家放送</span>
            <a href="javascript:;" class="more-btn">更多></a>
        </h2>
        <div class="song-list clearfix">
            <router-link :to="'/'" class="song-items" v-for="(item, index) in privatecontentList" :key=index>
                <div class="img-box">
                    <img :src="item.picUrl+'?imageView&thumbnail=360y360&quality=75&tostatic=0'" alt="" />
                </div>
                <p class="songs-der com-two-overflow">{{item.name}}</p>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'

import { Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  name: 'index',

  data () {
    return {

    }
  },

  computed: {
    bannerList: function () {
      return this.$store.state.home.bannerList
    },
    songList: function () {
      return this.$store.state.home.songList
    },
    privatecontentList: function () {
      return this.$store.state.home.privatecontentList
    }
  },

  mounted () {
    this.$store.state.play.isShowMiniMusic = true
    this.$store.dispatch('getBannerList')
    this.$store.dispatch('getSongList')
    this.$store.dispatch('getPrivatecontentList')
    this.$store.dispatch('getData')
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.mint-swipe {
    height: 10rem;
}

.mint-swipe .swipe-item {
    display: block;
    height: 100%;
}

.mint-swipe .swipe-item img {
    height: 100%;
    width: 100%;
}

.index-nav {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
}

.index-nav .nav-item {
    width: 72px;
    height: 72px;
    color: #333;
    text-align: center;
    font-size:18px;
}

.index-nav .nav-top {
    display: block;
    margin: 0 auto .3rem;
    width: 60%;
}

.index-nav .nav-text {
    width: 42px;
    line-height: 42px;
    border: 1px solid #d43c33;
    border-radius: 50%;
    font-size: 1.4rem;
    color: #d43c33;
}

.recommend-box .h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    line-height: 2rem;
    font-size: 1.1rem;
    padding: 0 .5rem;
    margin-bottom: 1rem;
}

.recommend-box .h2:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 2rem;
    background: #d43c33;
}

.recommend-box .more-btn {
    color: #333;
    font-size: .9rem;
}

.recommend-box .song-items {
    float: left;
    margin: 0 0 .5rem 1%;
    width: 32%;
    color: #333;
    overflow: hidden;
}

.recommend-box .song-items1 {
    width: 48%;
}

.recommend-box .img-box {
    position: relative;
    height: 8rem;
}

.recommend-box .img-box img {
    height: 100%;
}

.recommend-box .songs-der {
    font-size: 14px;
    margin-top: .2rem;
    height: 2.5rem;
    padding: 0 .3rem;
}

.recommend-box .art-name {
    color: #808080;
    font-size: .8rem;
}

</style>
