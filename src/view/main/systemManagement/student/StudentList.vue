<template>
  <div>
    <el-card>

      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'homepage' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>学生管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-row>
        <el-col>
          <div style="display: flex;justify-content: flex-end;margin-bottom: 15px">
            <el-button type="danger" plain @click="batchDeletionStudent">批量删除</el-button>
            <el-button type="success" style="background-color: #42b983" @click="addStudent">新增</el-button>
          </div>
        </el-col>
        <el-table :data="students"
                  @selection-change="handleSelectionChange"
                  :header-cell-style="{background:'#d1d1d1',color: '#303133'}">
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column prop="name" min-width="100" label="名称" fixed="left"/>
          <el-table-column prop="studentCode" min-width="150" label="学号"/>
          <el-table-column prop="sex" min-width="80" label="性别" align="center"/>
          <el-table-column prop="age" min-width="80" label="年龄" align="center"/>
          <el-table-column prop="studentGrade" min-width="80" label="年级" align="center"/>
          <el-table-column prop="studentClass" min-width="80" label="班级" align="center"/>
          <el-table-column prop="startYear" min-width="80" label="入学时间" align="center"/>
          <el-table-column prop="phone" min-width="150" label="手机号"/>
          <el-table-column prop="email" min-width="200" label="邮箱"/>
          <el-table-column prop="hobby" min-width="120" label="爱好"/>
          <el-table-column prop="remark" min-width="80" label="备注"/>
          <el-table-column label="操作" min-width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="updateStudent(scope.row.uid)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="delStudent(scope.row.uid)">删除
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
  import {StudentServer} from '@/view/main/systemManagement/student/StudentServer'

  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        totalCount: 1,
        students: [],
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
      getStudentListData: function () {
        let parameter = {
          msg: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          }
        }
        StudentServer.getStudentListData(parameter).then(res => {
          let data = res.data
          this.students = data.objList.map(student => {
            let hobby = JSON.parse(student.hobby)
            student.hobby = ''
            if (hobby && hobby.length > 0) {
              hobby.forEach(item => {
                student.hobby += item + ','
              })
            }
            student.hobby = student.hobby.slice(0, -1)
            return student
          })
          this.totalCount = data.msg.totalCount
        }).catch(err => {
          console.log(err)
          alert('网络繁忙')
        })
      },
      batchDeletionStudent: function () {
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
            StudentServer.batchDeletion(parameter).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getStudentListData()
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
      updateStudent: function (uid) {
        this.$router.push({
          name: 'student_edit',
          params: {
            uid: uid
          }
        })
      },
      addStudent: function () {
        this.$router.push({name: 'student_add'})
      },
      delStudent: function (uid) {
        if (window.confirm('确认要删除')) {
          StudentServer.delStudent(uid).then(() => {
            this.getStudentListData()
          }).catch(err => {
            console.log(err)
            alert('网络繁忙')
          })
        }
      }
    },
    mounted() {
      this.getStudentListData()
    }
  }
</script>

<style scoped>

</style>
