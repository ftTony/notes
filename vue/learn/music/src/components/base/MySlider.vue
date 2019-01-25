<template>
  <div class="my-slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
        <span v-for="(dot,index) in dots" :class="{active:currentDotsIndex===index}" class="dot">
        </span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {myDOM} from '@/common/js/myutils.js'

export default {
    components:{},
    data(){
        return {
            dots:[],
            currentDotsIndex:0
        }
    },
    props:{
        loop:{
            type:Boolean,
            default:true
        },
        // 是否自动播放
        autoPlay:{
            type:Boolean,
            default:true
        },
        // 轮播延时
        delay:{
            type:Number,
            default:3000
        }
    },
    methods:{
        // 轮播图（sliderGroup）宽度
        _setSliderWidth(isResize){
            this.children=this.$refs.sliderGroup.children

            // 拿到父元素（slider）宽度
            let width=0
            let sliderWidth=this.$refs.slider.clientWidth

            // 动态添加class、width
            for(let i=0;i<this.children.length;i++){
                let child=this.children[i]
                myDOM.addClass(child,'slider-item')

                child.style.width=sliderWidth+'px'
                width+=sliderWidth
            }
            if(this.loop && !isResize){
                width+=2*sliderWidth
            }

            this.$refs.sliderGroup.style.width=width+'px'
        },
        _initSlider(){
            this.slider=new BScroll(this.$refs.slider,{
                scrollX:true,
                scrollY:false,
                momentum:false,
                snap:true,
                snapLoop:this.loop,
                snapThreshold:0.3,
                snapSpeed:400
            })

            this.slider.on('scrollEnd',()=>{
                let nowIndex=this.slider.getCurrentPage().pageX

                if(this.loop){
                    nowIndex-=1
                }
            });
        }
    },
    created(){},
    mounted(){
        setTimeout(()=>{
            
        })
    },
    destroyed(){
        clearTimeout(this.timer)
    }
};
</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

</style>

