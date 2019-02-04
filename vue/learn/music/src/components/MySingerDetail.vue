<template>
    <transition name="slide">
        <my-music-list :songs="songs" :title="title" :bg-image="bgImage"></my-music-list>
    </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetail,getSongVkey} from '@/api/singer.js'
import {createSingerSong} from '@/common/js/SingerSongClass.js'
import MyMusicList from '@/components/MyMusicList'

export default {
    components:{
        MyMusicList
    },
    data(){
        return {
            songs:[]
        }
    },
    props:{},
    watch:{},
    methods:{
        // 获取指定歌手详情
        _getSingerDetail(){
            // 禁止直接刷新详情页（获取不到歌手id）
            if(!this.singer.id){
                this.$router.push('/singer')
                return
            }

            getSingerDetail(this.singer.id).then((res)=>{
                if(res.code===0){
                    this.songs=this._formatSongs(res.data.list)
                }
            })
        },
        // 重组res.data.list数据
        _formatSongs(list){
            let result=[]

            list.forEach((item)=>{
            //   解构赋值
            let {musicData}  =item
            getSongVkey(musicData.songmid).then((res)=>{
                const vkey=res.data.items[0].vkey
                if(musicData.songid && musicData.albumid){
                    result.push(createSingerSong(musicData,vkey))
                }
            })
            })

            return result
        }
    },
    computed:{
        ...mapGetters([
            'singer'
        ]),
        // 传入子组件
        title(){
            return this.singer.name
        },
        // 传入子组件
        bgImage(){
            return this.singer.avatar
        }
    },
    created(){
        this._getSingerDetail()
    },
    mounted(){},
    destroyed(){}
}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.slide-enter-active,.slide-leave-active{
    transition: all .3s ease;
}
.slide-enter,.slide-leave-to{
    opacity: 0;
    transform: translate3d(100%,0,0);
}
</style>

