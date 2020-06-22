<template>
  <div class="homepage">
    <div class="homepage-top">
      <div class="homepage-title">
        <span>课堂派</span>
      </div>
      <div class="homepage-nav">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#272E38"
          text-color="#fff"
          active-text-color="#fff">
          <el-menu-item :index="index.toString()" v-for="(nav, index) in navData" :key="nav.title">
            <router-link tag="span" :to="{name: nav.urlName}">
              <div class="tab-link">{{nav.title}}</div>
            </router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <div style="margin: 0 15px">
        <el-button plain @click="$router.push({name:'login'})">登录</el-button>
        <el-button type="primary" @click="$router.push({name:'register'})">注册</el-button>
      </div>
    </div>

    <div class="homepage-center">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import HomePageList from '@/view/homepage/HomepageList'

  export default {
    components: {HomePageList},
    data: function () {
      return {
        navData: [
          {title: '首页', urlName: 'homepage'},
          {title: '移动教学', urlName: 'demo2'},
          {title: '精品专区', urlName: 'demo3'},
          {title: '解决方案', urlName: 'demo4'},
          {title: '会员权益', urlName: 'demo5'},
          {title: '帮助中心', urlName: 'demo6'},
          {title: '产品动态', urlName: 'demo7'}
        ]
      }
    }
  }
</script>

<style scoped>
  .homepage {
    position: relative;
  }

  .homepage-top {
    position: fixed;
    z-index: 100;
    top: 0;
    width: 100%;
    min-width: 1000px;
    background-color: #272E38;
    display: flex;
    align-items: center;
    justify-self: flex-start;
  }

  .homepage-title {
    color: white;
    margin: 0 15px;
    font-size: 1.3em;
  }

  .homepage-nav {
    flex-grow: 1;
  }

  .tab-link {
    font-size: 1.2em;
    padding: 0 20px;
  }

  .router-link-active .tab-link {
    background: #2c58ab;
  }

  .el-menu {
    border-bottom: 0;
  }

  .el-menu-item {
    padding: 0;
  }

  .el-menu-item.is-active {
    border-bottom: 0;
  }

  .homepage-center {
    margin-top: 60px;
    height: 1500px;
  }

</style>
