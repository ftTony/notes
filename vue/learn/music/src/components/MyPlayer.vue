<template>
    <div class="my-player" v-show="playlist.length>0">

    </div>
</template>
<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import animations from 'create-keyframe-animation'
import {myTime,myArray} from '@/common/js/myutils.js'
import MyProgressBar from '@/components/base/MyProgressBar'


export default {
    data(){
        return {
            // 标志位。歌曲已缓存好，可以播放了
            songCanplay:false,
            // 当前播放时间
            currentTime:0,
            // 当前的歌词
            currentLyric:null,
            // 当前的歌词在第几行
            currentLyricLine:0,
            // 当前在哪个分页
            currentDot:'cd',
            // cd页小段歌词
            playingLyric:'无歌词数据',
            // 是否显示播放列表
            showList:false
        }
    },
    props:{},
    watch:{
        // 监控当前歌曲
        currentSong(newVal,oldVal){

        }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-player{
    .normal-player{
        position: fixed;
        left:0;
        right:0;
        top:0;
        bottom: 0;
        z-index: 150;
        background: $color-background;
        .background{
            position: absolute;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.6;
            filter: blur(20px);
        }
        .top{
            position: relative;
            margin-bottom: 25px;
            .back{
                position: absolute;
                top:0;
                left:6px;
                z-index: 50;
                .icon-back{
                    display: block;
                }
            }
        }
    }
}
</style>
