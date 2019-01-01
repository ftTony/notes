<template>
<div>
    {{name}}
    <button @click="changeParentData"> change the parent name</button>
    </div>
</template>
<script>
export default {
    props:['name'],
    methods:{
        changeParentData(){
            this.$emit('changeParent');
        }
    }
};
</script>

