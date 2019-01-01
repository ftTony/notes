<<template>
  <nav class="nav-box">
            <router-link to="/home" class="nav-item">音乐</router-link>
            <router-link to="/mv" class="nav-item">视频</router-link>
            <router-link to="/radio" class="nav-item">电台</router-link>
        </nav>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.nav-box {
    position: fixed;
    z-index: 1000;
    top: 53px;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    max-width:750px;
}
.nav-box .nav-item {
    width: 25%;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    color: #333;
    border-bottom: 1px solid #fff;
}
.nav-box .active {
    border-bottom: 1px solid #d43c33;
}
</style>


