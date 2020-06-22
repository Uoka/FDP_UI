<template>
  <div style="height: 100%">


    <div class="homepage-top">
      <div class="homepage-title">
        <div class="header-left">
          <el-image fit="cover"
                    style="width: 50px; height: 50px; border-radius: 25px;border: 1px solid #FF6C60;"
                    src="../../../../static/img/logo.png"/>
          <div style="margin-left: 15px">
            <span class="title">课堂派</span>
          </div>
        </div>
      </div>
      <div class="homepage-nav">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#FFF"
          text-color="#272523"
          active-text-color="#272523">
          <el-menu-item :index="index.toString()" v-for="(nav, index) in navData" :key="nav.title">
            <router-link tag="span" :to="{name: nav.urlName}">
              <div class="tab-link">{{nav.title}}</div>
            </router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <div style="margin: 0 15px">
        <div class="header-right">
          <span v-if="user" style="margin-right: 8px">{{user.name}}</span>
          <el-button type="danger" plain @click="logout">退出登录</el-button>
        </div>
      </div>
    </div>

    <div class="homepage-center">
      <router-view/>
    </div>

  </div>
</template>

<script>
  import store from '@/tools/store/index'
  import {AccountServer} from '@/view/account/AccountServer'

  export default {
    data: function () {
      return {
        navData: [
          {title: '课堂', urlName: 'teacher_class'},
          {title: '精品专区', urlName: 'teacher_demo1'},
          {title: '我的精品', urlName: 'teacher_demo2'}
        ],
        user: {}
      }
    },
    methods: {
      logout: function () {
        AccountServer.logout().then(() => {
          this.$store.commit('token/setToken')
          window.sessionStorage.setItem('isLogin', null)
          this.$router.push({name: 'homepage'})
        }).catch(err => {
          console.log(err.message())
        })
      }
    },
    mounted() {
      this.user = store.getters['token/user']
    }
  }
</script>

<style scoped>

  .homepage-top {
    width: 100%;
    min-width: 1000px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-self: flex-start;
    box-shadow: 0 2px 3px #d3d3d3;
  }

  .homepage-title {
    color: #272523;
    margin: 0 15px;
    font-size: 1.3em;
  }

  .homepage-nav {
    flex-grow: 1;
  }

  .header-left {
    height: 100%;
    padding: 0 15px;
    display: flex;
    align-items: center;
  }
  .tab-link {
    font-size: 1.2em;
    padding: 0 20px;
  }

  .router-link-active .tab-link {
    border-bottom: 3px solid #2C58AB;
  }

  .el-menu {
    border-bottom: 0;
  }

  .el-menu-item {
    padding: 0;
  }

  .homepage-center {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
