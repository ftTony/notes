<template>
<div class="music-list-wrapper">
    <section class="u-plhead pylst_header">
      <div class="plhead_bg" :style="{background:'url('+playlistdetail.coverImgUrl+')'}"></div>
      <div class="plhead_wrap">
        <div class="plhead_fl lsthd_fl">
          <img class="u-img" :src="playlistdetail.coverImgUrl">
          <span class="lsthd_icon"><!-- react-text: 8 -->歌单<!-- /react-text --></span>
          <i class="u-earp lsthd_num">{{Math.ceil(playlistdetail.playCount/10000)}}万</i>
          </div>
          <div class="plhead_fr">
            <h2 class="f-thide2 f-brk lsthd_title">{{playlistdetail.name}}</h2>
            <div class="lsthd_auth f-thide">
              <a class="lsthd_link" href="/m/user?id=40136303">
              <div class="u-avatar lsthd_ava">
                <img class="u-img" :src="playlistdetail.creator && playlistdetail.creator.avatarUrl">
                <span class="ava-icon ava-icon-daren"></span>
                {{playlistdetail.creator && playlistdetail.creator.nickname}}
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="pylst_intro">
      <div class="lstit_tags">标签：<em class="f-bd f-bd-full lstit_tag" v-for="item in playlistdetail.creator && playlistdetail.creator.expertTags">{{item}}</em>
        </div>
        <div class="u-intro">
          <div class="f-brk f-thide3">
            <span>
              <i>简介：{{playlistdetail.description}}</i>
              <br>
            </span>
            </div>
        </div>
      </section>
      <div class="pylst_list">
        <h3 class="u-smtitle">歌曲列表</h3>
        <ol class="u-songs">
          <li class="u-song" v-for="(item,index) in playlistdetail.tracks" @click="playMusicDetail(index)">
            <div class="sgi_fl">{{index+1}}</div>
            <div class="sgi_fr f-bd f-bd-btm">
              <div class="sgich_fl">
                <div class="f-thide sgich_tl">{{item.name}}</div>
                <div class="f-thide sgich_info">{{item.ar[0].name}} - {{item.al.name}}</div>
              </div>
              <div class="sgich_fr">
                <span class="u-hmsprt sgich_ply" data-reactid="120"></span>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'MusicList',
  data () {
    return {
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('getPlayList', to.params.id)
    })
  },
  computed: mapState({
    playlistdetail: state => state.musicList.playlistdetail,
    privileges: state => state.musicList.privileges
  }),
  watch: {
    playlistdetail () {
      var ids = ''
      var tmp = []
      this.playlistdetail.tracks && this.playlistdetail.tracks.forEach((item) => {
        var obj = {}
        obj.name = item.al.name
        obj.picUrl = item.al.picUrl
        obj.id = item.al.id
        ids += item.id + ','
        tmp.push(obj)
      })
      ids = ids.substring(0, ids.length - 1)
      this.$store.dispatch('getDetail', ids).then((ret) => {
        ret.forEach((item, index) => {
          tmp[index]['src'] = item.url
        })
        this.$store.state.play.musicData = tmp
        this.$store.commit('toggleMusic', 0)
      })
    }
  },
  mounted () {
    this.$store.state.play.isShowMiniMusic = false
  },
  methods: {
    playMusicDetail (index) {
      this.$store.commit('toggleMusic', index)
      this.$store.state.play.isShowIndex = false
    }
  }

}
</script>
<style lang="scss">
.music-list-wrapper{
    padding-top: 94px;
}

.u-plhead {
    position: relative;
    padding: 30px 10px 30px 15px;
    overflow: hidden;
}

.u-plhead .plhead_bg, .u-plhead .plhead_bg:after {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

.pylst_intro {
    position: relative;
    margin: 0 10px 0 15px;
    padding-top: 10px;
    line-height: 19px;
    color: #666;
}

.lstit_tags {
    margin-bottom: 10px;
    line-height: 20px;
    margin-right: -10px;
}

.lstit_tag {
    display: inline-block;
    margin-right: 10px;
    padding: 1px 8px;
    font-size: 12px;
}

.lstit_tag:after {
    border-radius: 9999px;
    width: 300%;
    height: 300%;
    -webkit-transform: scale(.333333);
    transform: scale(.333333);
}

.f-thide2, .f-thide3, .f-thide4 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.f-thide3 {
    -webkit-line-clamp: 3;
}

.u-smtitle {
    height: 23px;
    line-height: 23px;
    padding: 0 10px;
    font-size: 12px;
    color: #666;
    background-color: #eeeff0;
}

.u-song {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}

.f-brk {
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
}

.f-bd {
    position: relative;
}

.u-plhead .plhead_bg {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    -webkit-filter: blur(20px);
    filter: blur(20px);
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
}

.u-plhead .plhead_wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: relative;
    z-index: 2;
}

.u-plhead .plhead_fl {
    width: 145px;
    height: 145px;
    position: relative;
    background-color: #e2e2e3;
}
.pylst_header .lsthd_fl:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 18px;
    z-index: 2;
    background-image: -webkit-linear-gradient(left,transparent,rgba(0,0,0,.2));
    background-image: linear-gradient(90deg,transparent,rgba(0,0,0,.2));
}

.u-plhead .plhead_bg, .u-plhead .plhead_bg:after {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

.u-plhead .plhead_bg:after {
    content: " ";
    background-color: rgba(0,0,0,.25);
}

.u-earp {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zd…4xNDUuNTY5LS4zNi43NTMuMjI0LjMzNC4zNi43Mi4zNiAxLjEzOHYyLjU1MiIvPjwvc3ZnPg==);
}

.u-song .sgich_tl {
    font-size: 17px;
}
.f-bd:after {
    width: 300%;
    height: 300%;
    -webkit-transform: scale(.333333);
    transform: scale(.333333);
    position: absolute;
    z-index: 2;
    content: "";
    top: 0;
    left: 0;
    pointer-events: none;
    box-sizing: border-box;
    -webkit-transform-origin: top left;
    transform-origin: top left;
    border: 0 solid rgba(0,0,0,.1);
}
.f-bd-full:after {
    border-width: 1px;
}
.f-bd-btm:after {
    border-bottom-width: 1px;
}
.u-song .sgich_info{
  font-size: 12px;
  color:#888;
}

.pylst_header .lsthd_ava {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
    position: relative;
}
.u-avatar>.u-img {
    border-radius: 50%;
}
.u-avatar .ava-icon.ava-icon-daren {
    background-position: -40px 0;
}
.u-img {
    width: 100%;
    vertical-align: middle;
}
.pylst_header .lsthd_icon {
    position: absolute;
    z-index: 3;
    top: 10px;
    left: 0;
    padding: 0 8px;
    height: 17px;
    color: #fff;
    font-size: 9px;
    text-align: center;
    line-height: 17px;
    background-color: rgba(217,48,48,.8);
    border-top-right-radius: 17px;
    border-bottom-right-radius: 17px;
}
.pylst_header .lsthd_num {
    position: absolute;
    right: 2px;
    top: 0;
    z-index: 3;
    padding-left: 15px;
    color: #fff;
    font-size: 12px;
    background-position: 0;
    background-repeat: no-repeat;
    background-size: 11px 10px;
    text-shadow: 1px 0 0 rgba(0,0,0,.15);
}
.pylst_header .lsthd_link {
    display: inline-block;
    color: hsla(0,0%,100%,.7);
}

.u-plhead .plhead_fr {
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    margin-left: 16px;
}

.u-intro {
    position: relative;
    padding-bottom: 18px;
    line-height: 19px;
    color: #666;
}

.pylst_header .lsthd_title {
    padding-top: 1px;
    font-size: 17px;
    line-height: 1.3;
    color: #fefefe;
    height: 44px;
    display: -webkit-box;
    -webkit-box-pack: center;
}

.pylst_header .lsthd_auth {
    display: block;
    position: relative;
    margin-top: 20px;
}

.showRouter-enter-active {
  transition: all .4s ease;
}

.showRouter-leave-active {
  transition: all 0 ease;
}

.showRouter-enter, .showRouter-leave-active {
  transform: translateX(-150px);
  opacity: 0;
}

.u-song .sgi_fr, .u-song .sgich_fl {
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
}

.u-song{
  display: -webkit-bo;
  display: -webkit-flex;
  display: flex;
}

.u-song .sgich_fl {
    padding: 6px 0;
    width: 0;
}

.u-song .sgi_fl {
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 40px;
    font-size: 17px;
    color: #999;
}

.u-song .sgi_fl, .u-song .sgi_fr{
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  overflow: hidden;
}
.u-song .sgich_fr {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 0 10px;
}
.u-song .sgich_ply {
    display: inline-block;
    width: 22px;
    height: 22px;
    background-position: -24px 0;
}
.u-hmsprt {
    background-image: url(//s3.music.126.net/m/s/img/index_icon_3x.png);
    background-size: 166px 97px;
}
.f-thide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
}
  .music-list {
    padding-top: 4px;
    padding-left: 4px;
    padding-right: 4px;
    // padding-bottom: 40px;
    flex:8;
    overflow: auto;
    .music-item + .music-item {
      border-top: 1px solid rgba(0, 0, 0, .1);
    }
    .music-item {
      // box-shadow: 0 0 1px #DD2C00;
      padding: 4px 6px 0 6px;
      position: relative;
      margin-bottom: 4px;
      border-radius: 5px;
      cursor: pointer;
      border: none;

      .music-img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
      span.music-name {
        display: inline-block;
        width: 65%;
        vertical-align: top;
        margin-top: 15px;
        margin-left: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;

        padding-bottom: 20px;
      }

      span.del-icon {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 20px;
        width: 20px;
        height: 20px;
        background: url('../images/del.svg');
        background-size: contain;
        cursor: pointer;
      }
    }
    .tips {
      text-align: center;
      margin: 12px auto;
      width: 200px;
      font-size: 80%;
      color: gray;
    }
  }
</style>


