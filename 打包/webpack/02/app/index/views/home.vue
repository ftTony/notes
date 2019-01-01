<template>
    <div class="home-container">
        <h1>欢迎来到home</h1>
        <p>{{msg}}</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            msg:'我是home组件'
        }
    }
}
</script>
<style lang="stylus">
.home-container
  width 100%
</style>

