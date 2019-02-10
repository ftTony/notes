<template>
    <div class="my-search-list">
        <transition-group name="list" tag="ul">
            <li class="search-item" v-for="item in searches" :key="item" @click="selectItem(item)">
                <span class="text">{{item}}</span>
            </li>
        </transition-group>
    </div>
</template>
<script>
export default {
    components:{},
    data(){
        return {}
    },
    props:{
        searches:{
            type:Array,
            default:[]
        }
    },
    watch:{},
    methods:{
        selectItem(item){
            this.$emit('select',item)
        },
        deleteOne(item){
            this.$emit('delete',item)
        }
    },
    // 过滤器设计目的就是用于简单的文件转换
    filters:{},
    // 若要实现更复杂的数据变换，你应该使用计算属性
    computed:{},
    created(){},
    mounted(){},
    destroyed(){}
}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mymixin.scss';

.my-search-list{
    .search-item{
        display: flex;
        align-items: center;
        height: 40px;
        overflow: hidden;
        &.list-enter-active,&.list-leave-active{
            transition: all 0.1s;
        }
        &.list-enter,&.list-leave-to{
            height: 0;
        }
        .text{
            flex: 1;
            color:$color-text-l;
        }
        .icon{
            @include extend-click();
            .icon-delete{
                font-size: $font-size-small;
                color:$color-text-d;
            }
        }
    }
}
</style>
