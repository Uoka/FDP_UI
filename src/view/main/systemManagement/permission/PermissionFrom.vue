<template>
  <div>
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'homepage' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'permission_list' }">权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{uid?'修改':'新增'}}权限</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="from-panel">
        <el-form ref="PermissionFrom" :model="permissionFrom">
          <el-row :gutter="35">
            <el-col :span="12">
              <el-form-item prop="name" label="名称" label-width="150px">
                <el-input v-model="permissionFrom.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="code" label="编码" label-width="150px">
                <el-input v-model="permissionFrom.code"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="remark" label="备注" label-width="150px">
                <el-input type="textarea" :rows="2" v-model="permissionFrom.remark"/>
              </el-form-item>
            </el-col>
            <el-col :span="12"
                    v-for="(permissionLine, index) in permissionFrom.permissionLines"
                    :key="index">
              <el-form-item label-width="150px"
                            :label="'url-' + index"
                            :prop="'permissionLines.' + index + '.apiURL'"
                            :rules="{  required: true, message: 'URL不能为空', trigger: 'blur' }">
                <el-select filterable
                           clearable
                           allow-create
                           default-first-option
                           v-model="permissionLine.apiURL"
                           placeholder="请选择"
                           STYLE="width: 80%">
                  <el-option
                    v-for="(permissionURL, index) in permissionURLs"
                    :key="index"
                    :label="permissionURL.method + ': ' + permissionURL.url"
                    :value="permissionURL.url">
                  </el-option>
                </el-select>
                <el-button @click.prevent="removePermissionLine(permissionLine)">删除</el-button>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label-width="150px">
                <el-button @click="addPermissionLine">新增URl</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-row type="flex" justify="end">
        <el-col :span="2" :pull="2">
          <el-button @click="cancel">返回</el-button>
        </el-col>
        <el-col :span="2" :pull="2">
          <el-button type="primary" @click="confirm">确认</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {PermissionServer} from '@/view/main/systemManagement/permission/PermissionServer'

  export default {
    data() {
      return {
        uid: null,
        permissionFrom: {
          name: '',
          code: '',
          remark: '',
          permissionLines: []
        },
        permissionURLs: []
      }
    },
    methods: {
      addPermissionLine: function () {
        this.permissionFrom.permissionLines.push({
          apiURL: '',
          key: Date.now()
        })
      },
      removePermissionLine: function (permissionLine) {
        let index = this.permissionFrom.permissionLines.indexOf(permissionLine)
        if (index !== -1) {
          this.permissionFrom.permissionLines.splice(index, 1)
        }
      },
      cancel: function () {
        this.$router.push({name: 'permission_list'})
      },
      confirm: function () {
        if (this.uid) {

        } else {
          let parameter = {
            objList: this.permissionFrom.permissionLines,
            msg: {
              name: this.permissionFrom.name,
              code: this.permissionFrom.code,
              remark: this.permissionFrom.remark
            }
          }
          PermissionServer.addPermission(parameter).then(() => {
            this.$router.push({name: 'permission_list'})
          }).catch(err => {
            console.log(err)
            this.$message({
              message: token.error,
              type: 'warning'
            })
          })
        }
      },
      getPermissionWithLineById: function (uid) {
        PermissionServer.getPermissionWithLineById(uid).then(res => {
          this.permissionFrom = res.data.objList[0]
        }).catch(err => {
          console.log(err)
          alert('网络繁忙')
        })
      },
      getPermissionURLs: function () {
        PermissionServer.getPermissionURLs().then(res => {
          this.permissionURLs = res.data
        }).catch(err => {
          console.log(err)
          alert('网络繁忙')
        })
      }
    },
    mounted: function () {
      this.uid = this.$route.params.uid
      if (this.uid && this.uid > 0) {
        this.getPermissionWithLineById(this.uid)
      }
      this.getPermissionURLs()
    }
  }
</script>

<style scoped>

</style>
