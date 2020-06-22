<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-header style="padding: 0; height: 63px">
        <div class="header-bar">
          <div class="header-left">
            <el-image fit="cover"
                      style="width: 50px; height: 50px; border-radius: 25px;border: 1px solid #FF6C60"
                      src="../../../../static/img/logo.png"/>
            <div>
              <span class="title">课堂派管理系统</span>
            </div>
          </div>
          <div class="header-right">
            <span v-if="user" style="margin-right: 8px">{{user.name}}</span>
            <el-button type="danger" plain @click="logout">退出登录</el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div>
            <el-menu
              style="border: 0"
              default-active="2"
              active-text-color="#FF6C60"
              unique-opened>
              <el-submenu v-for="(menu, index) in menus"
                          :key="menu.title"
                          :index="index.toString()">
                <template slot="title">
                  <i :class="menu.icon"/>
                  <span>{{menu.title}}</span>
                </template>
                <el-menu-item v-for="(child, index) in menu.child"
                              :key="child.title"
                              :index="index.toString()">
                  <router-link tag="span" :to="{name: child.url_name}">
                    <div>{{child.title}}</div>
                  </router-link>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>
        <el-main style="background-color: #f0f0f0">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import store from '@/tools/store/index'
  import {AccountServer} from '@/view/account/AccountServer'

  export default {
    data: function () {
      return {
        menus: [
          {
            title: '教务管理',
            icon: 'el-icon-menu',
            child: [
              {
                title: '学生管理',
                url_name: 'student_list'
              }, {
                title: '教师管理',
                url_name: 'teacher_list'
              }
            ]
          }, {
            title: '系统管理',
            icon: 'el-icon-s-tools',
            child: [
              {
                title: '角色管理',
                url_name: 'role_list'
              },{
                title: '权限管理',
                url_name: 'permission_list'
              }
            ]
          }, {
            title: '测试',
            icon: 'el-icon-s-opportunity',
            child: [
              {
                title: '组件测试',
                url_name: 'test'
              }
            ]
          }
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

  .header-bar {
    height: 60px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 3px #d3d3d3;
  }

  .header-left {
    height: 100%;
    padding: 0 15px;
    display: flex;
    align-items: center;
  }

  .header-right {
    height: 100%;
    padding: 0 15px;
    display: flex;
    align-items: center;
  }

  .title {
    color: #FF6C60;
    font-weight: 600;
    font-size: 1.7em;
    margin-left: 15px;
  }

  .menu /deep/ .el-submenu__title i {
    color: white;
  }

  .el-menu {
    border-bottom: 0;
  }

  .el-menu-item {
    padding: 0;
  }
</style>
