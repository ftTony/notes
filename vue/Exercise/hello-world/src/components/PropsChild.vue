<template>
    <div>
        {{name}}
        <button @click="changeName">Change Name</button>
    </div>
</template>

<script>
export default {
    props:['name','changeName']
}
</script>