<template>
    <div>
        <h1>Event Parent</h1>
        <event-child :name="childName" @changeParent="changeChildName"></event-child>
    </div>
</template>

<script>
import EventChild from "./EventChild";
export default {
  components: {
    EventChild
  },
  data() {
    return {
      childName: "child name is what"
    };
  },
  methods: {
    changeChildName() {
      this.childName = "no name";
    }
  }
};
</script>

