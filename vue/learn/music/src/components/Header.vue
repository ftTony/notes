<<template>
    <header class="header">
        <div class="name">
            <span @click="showAsideMenu(true)" class="func">
                <i class="func-icon"></i>
            </span>
             <p>云音乐</p>
            <span class="search">
                <i @click="toSearch" class="search-icon"></i>
            </span>
            </div>
    </header>
</template>
<script>
export default {
  nam: 'Header',
  methods: {
    showAsideMenu (flag) {
      this.$store.commit('showAsideMenu', flag)
    },
    toSearch () {

    }
  }
}
</script>
<style lang="scss" scoped>
.header {
    background-color: #B72712;
    color: white;
    flex: 1;
    width: 100%;
    position: fixed;
    z-index: 1000;
    max-width: 750px;
    .name {
      display: flex;
      justify-content: space-between;
      text-align: center;
      padding-top: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, .2);

      span.func {
        flex: 1;
        position: relative;

        i {
          display: inline-block;
          position: absolute;
          width: 20px;
          height: 20px;
          left: 15px;
          bottom: 0;
          background: url(../images/func.svg) no-repeat;
          background-size: contain;
          cursor: pointer;
        }
      }
      p {
        flex: 1;
      }
      span.search {
        position: relative;
        flex: 1;
        i {
          display: inline-block;
          position: absolute;
          width: 20px;
          height: 20px;
          right: 15px;
          bottom: 0;
          background: url(../images/search.svg) no-repeat;
          background-size: contain;
          cursor: pointer;
        }
      }
    }
}
</style>

