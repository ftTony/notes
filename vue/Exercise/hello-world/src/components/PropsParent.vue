<template>
    <div>
        <h1>Props Parent</h1>
        <props-child :name="childName" :changeName='changeChildName'></props-child>
    </div>
</template>
<script>
import PropsChild from "./PropsChild";
export default {
  components: {
      PropsChild
  },
  data() {
      return{
          childName:'child name is what?'
      }
  },
  methods:{
      changeChildName(){
          this.childName='no name';
      }
  }
};
</script>
