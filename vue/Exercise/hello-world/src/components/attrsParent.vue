<template>
  <div>
    <h2>小武子</h2>
    <child-com1
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="fttony"
    ></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import('./attrsChild.vue')
export default {
  components: { childCom1 },
  data () {
    return {
      foo: 'JavaScript',
      boo: 'Html',
      coo: 'CSS',
      doo: 'Vue'
    }
  }
}
</script>