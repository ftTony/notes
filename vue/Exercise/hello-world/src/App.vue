<template>
  <div id="app">
    <!-- <Parent/>
    <event-parent></event-parent>
    <props-parent></props-parent> -->
    <!-- <attrs></attrs> -->
    <listeners></listeners>
  </div>
</template>

<script>
// import Parent from "./components/Parent.vue";
// import EventParent from "./components/EventParent.vue";
// import PropsParent from "./components/PropsParent.vue";

import listeners from './components/listenersParent.vue'

export default {
  name: "app",
  components: {
    listeners
    // attrs,
    // Parent,
    // EventParent,
    // PropsParent
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
