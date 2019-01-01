<template>
 <div>
   <h1>Parent</h1>
   <child :name='childName' />
   <button @click="changeChildName">change the child</button>
 </div>
</template>

<script>
import Child from './Child';
export default {
  components:{
    Child
  },
  data(){
    return {
      childName:'child name is what?'
    }
  },
  methods:{
    changeChildName(){
      this.childName='no name';
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
