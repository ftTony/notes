<template>
  <my-scroll
    ref="scrollRef"
    :data="data"
    :probeType="probeType"
    :listen-scroll="listenScroll"
    @scroll="scroll"
    class="my-phone-list"
  >
    <!-- 左侧歌手列表 -->
    <ul>
      <li ref="leftRef" v-for="group in data" class="list-group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" @click="selectItem(item)" class="list-group-item">
            <img v-lazy="item.avatar" alt class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 右侧字母列表 -->
    <div
      @touchstart="onShortcutTouchstart"
      @touchmove.stop.prevent="onShortcutTouchmove"
      class="list-shortcut"
    >
      <ul>
        <li
          v-for="(item,index) in shortcut"
          :data-index="index"
          :class="{'current':currentIndex===index}"
          class="item"
        >{{item}}</li>
      </ul>
    </div>

    <!-- 滚动固定标题实现 -->
    <div class="list-fixed" ref="fixedTitleRef" v-show="fixedTitle">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>

    <div class="loading-container" v-show="!data.length">
      <my-loading></my-loading>
    </div>
  </my-scroll>
</template>
<script>
import MyScroll from "@/components/base/MyScroll";
import MyLoading from "@/components/base/MyLoading";
import { myDOM } from "@/common/js/myutils.js";

const RIGHT_ONEWORD_HEIGHT = 18;
const TITLE_HEIGHT = 29;

export default {
  components: {
    MyScroll,
    MyLoading
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      // 标题上推y值（热门标题-A标题）
      diff: -1
    };
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._caclHeight();
      }, 20);
    },
    // 监听scroll落在leftListHeight的哪个区间，实现高度联动
    scrollY(newY) {
      const leftListHeight = this.leftListHeight;

      //   当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }

      // 在中间部分滚动
      for (let i = 0; i < leftListHeight.length - 1; i++) {
        let height1 = leftListHeight[i];
        let height2 = leftListHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this.diff = height2 + newY;
          return
        }
      }

    //   当滚动到底部，且-newY大于最后一个元素的上限
    this.currentIndex=leftListHeight.length-2
    },
    diff(newVal){
        let fixedTop=(newVal>0 && newVal<TITLE_HEIGHT)?newVal-TITLE_HEIGHT:0

        if(this.fixedTop===fixedTop){
            return
        }
        this.fixedTop=fixedTop
        this.$refs.fixedTitleRef.style.transform=`translate3d(0,${fixedTop}px,0)`
    }
  },
  methods:{
    //   对父亲提供的刷新better-scroll方法
    refresh(){
        this.$refs.scrollRef.refresh()
    },
    // 向上派发item项点击事件
    selectItem(item){
        this.$emit('select',item)
    },
    // 点击右侧，左侧联动
    onShortcutTouchstart(e){

        let nowTouch=e.touches[0]
        this.touch.y1=nowTouch.pageY

        let nowIndex=myDOM.customAttribute(e.target,'index')
        this.touch.nowIndex=nowIndex

        this._scrollTo(nowIndex)
    },
    // 滑动右侧，左侧联动，与左侧共享touch对象
    onShortcutTouchmove(e){
        let nowTouch=e.touches[0]
        this.touch.y2=nowTouch.pageY

        let offset=Math.floor((this.touch.y2-this.touch.y1)/RIGHT_ONEWORD_HEIGHT)
        let nowIndex=Number(this.touch.nowindex)+offset

        this._scrollTo(nowIndex)
    },
    scroll(pos){
        this.scrollY=pos.y
    },
    _scrollTo(index){
        // 超出范围不能点击和拖动
        if(!index){
            return 
        }
        if(index<0){
            index=0
        }else if(index>this.leftListHeight.length-2){
            index=this.leftListHeight.lenght-2
        }

        this.currentIndex=Number(index)
        this.$refs.scrollRef.scrollToElement(this.$refs.leftRef[index],0)
    },
    // 计算leftListHeight的高度
    _caclHeight(){
        // 初始化
        let height=0
        this.leftListHeight=[]
        this.leftListHeight.push(height)

        let list=this.$refs.leftRef
        for(let i=0;i<list.length;i++){
            height+=list[i].clientHeight
            this.leftListHeight.push(height)
        }
    }
  },
  computed:{
      shortcut(){
          return this.data.map((group)=>{
              return group.title.substr(0,1)
          })
      },
      fixedTitle(){
          if(this.scrollY>0){
              return ''
          }
          return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
      }
  },
  created(){
      this.touch={}
      this.listenScroll=true
      this.leftListHeight=[]
      this.probeType=3
  },
  mounted(){},
  destroyed(){}
};
</script>
<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-phone-list{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .list-group{
        padding-bottom:30px;
        .list-group-title{
            height:30px;
            line-height: 30px;
            padding-left:20px;
            font-size: $font-size-small;
            color:$color-text-l;
            background: $color-highlight-background;
        }
        .list-group-item{
            display: flex;
            align-items: center;
            padding:20px 0 0 30px;
            .avatar{
                width:50px;
                height:50px;
                border-radius: 50%;
            }
            .name{
                margin-left: 20px;
                color:$color-text-l;
                font-size: $font-size-medium;
            }
        }
    }
    .list-shortcut{
        position: absolute;
        z-index: 30;
        right:0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding:20px 0;
        border-radius: 10px;
        text-align: center;
        background: $color-background-d;
        font-family: Helvetica;
        .item{
            padding:3px;
            line-height: 1;
            color:$color-text-l;
            font-size: $font-size-small;
            &.current{
                color:$color-theme;
            }
        }
    }
    .list-fixed{
        position: absolute;
        top:-1px;
        left:0;
        width: 100%;
        .fixed-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color:$color-text-l;
            background: $color-highlight-background;
        }
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top:50%;
        transform:translateY(-50%);
    }
}
</style>
