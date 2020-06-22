<template>
  <div>
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'homepage' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-row>
        <el-col>
          <div style="display: flex;justify-content: flex-end;margin-bottom: 15px">
            <el-button type="danger" plain @click="batchDeletionPermission">批量删除</el-button>
            <el-button type="success" style="background-color: #42b983" @click="addPermission">新增</el-button>
          </div>
        </el-col>
        <el-table :data="permissions"
                  @selection-change="handleSelectionChange"
                  :header-cell-style="{background:'#d1d1d1',color: '#303133'}">
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column prop="name" min-width="100" label="名称" fixed="left"/>
          <el-table-column prop="code" min-width="150" label="编码"/>
          <el-table-column prop="remark" min-width="80" label="备注"/>
          <el-table-column label="操作" min-width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="updatePermission(scope.row.uid)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="delPermission(scope.row.uid)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 25]"
          :total="totalCount"
          background
          layout="total,sizes, prev, pager, next, jumper">
        </el-pagination>
      </el-row>

    </el-card>
  </div>
</template>

<script>
  import {PermissionServer} from '@/view/main/systemManagement/permission/PermissionServer'

  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        totalCount: 1,
        permissions: [],
        selectId: []
      }
    },
    methods: {
      handleSizeChange: function (newPageSize) {
        this.pageSize = newPageSize
        this.getStudentListData()
      },
      handleCurrentChange: function (newCurrentPage) {
        this.currentPage = newCurrentPage
        this.getStudentListData()
      },
      handleSelectionChange: function (val) {
        this.selectId = val.map(student => {
          return student.uid
        })
      },
      getPermissionListData: function () {
        let parameter = {
          msg: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          }
        }
        PermissionServer.getPermissionListData(parameter).then(res => {
          let data = res.data
          this.permissions = data.objList
          this.totalCount = data.msg.totalCount
        }).catch(err => {
          console.log(err)
          alert('网络繁忙')
        })
      },
      batchDeletionPermission: function () {
        if (this.selectId && this.selectId.length === 0) {
          this.$message({
            message: '请先选择数据',
            type: 'warning'
          })
        } else {
          this.$confirm('此操作将删除选择的学生, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let parameter = {
              objList: this.selectId
            }
            PermissionServer.batchDeletion(parameter).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getPermissionListData()
            }).catch(err => {
              console.log(err)
              this.$message({
                type: 'error',
                message: '网络繁忙!'
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      },
      updatePermission: function (uid) {
        this.$router.push({
          name: 'permission_edit',
          params: {
            uid: uid
          }
        })
      },
      addPermission: function () {
        this.$router.push({name: 'permission_add'})
      },
      delPermission: function (uid) {
        if (window.confirm('确认要删除')) {
          PermissionServer.delPermission(uid).then(() => {
            this.getPermissionListData()
          }).catch(err => {
            console.log(err)
            alert('网络繁忙')
          })
        }
      }
    },
    mounted() {
      this.getPermissionListData()
    }
  }
</script>

<style scoped>

</style>
