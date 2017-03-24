<template>
  <div>
    <p>childCom3{{$attrs}}</p>
  </div>
</template>
<script>
export default {
  props: {
    coo: String,
    title: String
  }
}
</script>