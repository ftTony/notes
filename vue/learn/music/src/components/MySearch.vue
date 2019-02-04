<template>
    <div class="my-search">
        <!-- 搜索框 -->
        <div class="search-box-wrapper">
            <my-search-box ref="searchBoxRef" @query="onQueryChange"></my-search-box>
        </div>
        <div class="shortcut-wrapper" v-show="!query" ref="shortcutRef">
            <my-scroll class="shortcut" ref="scrollRef" :data="scrollData" :refreshDelay="refreshDelay">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>

                        <ul>
                            <li class="item" v-for="item in hotkey" @click="addQuery(item.k)">
                                <span>{{iem.k}}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- 搜索历史 -->
                    <div class="search-history" v-show="searchHistory.length">
                        <h1 class="title">
                            <span class="text">搜索历史</span>

                            <span class="clear" @click="showConfrim">
                                <i class="icon-clear"></i>
                            </span>
                        </h1>

                        <my-search-list :searches="searchHistory" @select="addQuery" @delete="deleteHis"></my-search-list>
                    </div>
                </div>
            </my-scroll>
        </div>

        <!-- 搜索结果 -->
        <div class="search-result" ref="resultRef" v-show="query">
            <my-suggest-List ref="suggestRef" :query="query" :zhida="zhida" @beforeScroll="blurInput" @select="savaHis"></my-suggest-List>
        </div>

        <!-- 清空弹窗 -->
        <my-confirm ref="confirmRef" @confirm="confirm" @cancel="cancel"></my-confirm>

        <router-view></router-view>
    </div>
</template>
<script>
import MySearchBox from '@/components/base/MySearchBox'
import MySuggestList from '@/components/MySuggestList'
import MySearchList from '@/components/base/MySearchList'
import MyConfirm from '@/components/base/MyConfirm'
import MyScroll from '@/components/base/MyScroll'
import {getHotKey} from '@/api/search.js'
import {mapActions,mapGetters} from 'vuex'
import {playlistMixin} from '@/common/js/mixin.js'

export default {
    mixins:[playlistMixin],
    components:{
        MySearchBox,
        MySuggestList,
        MySearchList,
        MyConfirm,
        MyScroll
    },
    data(){
        return {
            // 热闹搜索关键系
            hotkey:[],
            // 搜索字段
            query:'',
            // 是否显示歌手
            zhida:true,
            refreshDelay:100
        }
    },
    props:{},
    watch:{
        // 解决添加歌曲后不能滚动的问题
        query(newVal){
            if(!newVal){
                setTimeout(()=>{
                    this.$refs.scrollRef.refresh()
                },20)
            }
        }
    },
    filters:{},
    methods:{
        ...mapActions(['saveHistory','delHistory','clearHistory']),
        // 保存搜索结果历史到vuex和localstorage中
        saveHis(){
            this.saveHistory(this.query)
        },
        deleteHis(item){
            this.delHistory(item)
        },
        showConfirm(){
            this.$refs.confirmRef.show()
        },
        confirm(){
            this.clearHistory()
        },
        cancel(){
            return
        },
        // 当检索值改变时
    }
}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-search{

}
</style>

