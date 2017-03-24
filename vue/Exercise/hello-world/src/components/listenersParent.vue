<template>
  <div>
    <child @change="change"></child>
  </div>
</template>
<script>
const child = () => import('./listenersChild.vue');
export default {
  components: {
    child
  },
  methods: {
    change () {
      console.log('asdf');
    }
  }
}
</script>