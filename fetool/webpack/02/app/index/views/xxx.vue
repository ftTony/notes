<template>
    <div class="xxx-container">
        <h1>欢迎来到xxx</h1>
        <p>{{msg}}</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            msg:'我是xxx组件'
        }
    }
}
</script>
<style lang="stylus">
.xxx-container
  width 100%
</style>
