<template>
  <div>listeners子组件</div>
</template>
<script>
export default {
  mounted () {
    console.log(this.$listeners) //即可拿到 change 事件
  }
}
</script>