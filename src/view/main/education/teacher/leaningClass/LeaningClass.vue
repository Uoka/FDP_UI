<template>
  <div class="leaningClass-main">
    <div style="display: flex;justify-content: space-between">
      <div>全部课程</div>
      <div>
        <span class="left-btn">课堂排序</span>
        <span class="left-btn">归档管理</span>
      </div>
    </div>
    <el-divider/>
    <div style="width: 1500px; display: flex;justify-content: center">
      <div class="class-panel">
        <div v-for="(leaningClass, index) in leaningClasses"
             :key="leaningClass.uid"
             @click="editClass(index)"
             style="width: 280px;margin: 10px;cursor: pointer">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <img src="../../../../../assets/leaningClass/ketang_15.png"
                 class="image" alt="topian"/>
            <div style="padding: 14px;height:150px;">
              <span style="font-size: 1.2em;margin: auto;">{{leaningClass.name}}</span>
              <p style="color: #8c939d;text-indent:2em">{{leaningClass.description}}</p>
            </div>
          </el-card>
        </div>
        <div style="width: 280px;margin: 10px;cursor: pointer" @click="addClass">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <img src="../../../../../assets/leaningClass/create-course.png"
                 class="image"/>
            <div
              style="padding: 14px;height:150px;display: flex;flex-direction: column;align-items: center;justify-content: center">
              <span>添加课堂</span>
              <el-icon class="el-icon-plus" style="font-size: 4em"/>
            </div>
          </el-card>
        </div>
      </div>
    </div>


    <el-dialog :title="(leaningClassFrom.uid?'编辑':'添加') + '课程'" :visible.sync="addClassFormVisible">
      <el-form :model="leaningClassFrom">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="name" label="名称" label-width="120px">
              <el-input v-model="leaningClassFrom.name" autocomplete="off"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="description" label="描述" label-width="120px">
              <el-input v-model="leaningClassFrom.description" autocomplete="off"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="startTime" label="开始时间" label-width="150px">
              <el-date-picker
                v-model="leaningClassFrom.startTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="endTime" label="结束时间" label-width="150px">
              <el-date-picker
                v-model="leaningClassFrom.endTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addClassFormVisible = false">取 消</el-button>
        <el-button v-if="leaningClassFrom.uid" @click="archiveClass(leaningClassFrom.uid)">归 档</el-button>
        <el-button type="primary" @click="addLeaningClass">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {TeacherClassServer} from '@/view/main/education/teacher/leaningClass/TeacherClassServer'

  export default {
    name: 'leaningClass',
    data: function () {
      return {
        addClassFormVisible: false,
        leaningClassFrom: {},
        leaningClasses: []
      }
    },
    methods: {
      editClass: function(index) {
        this.leaningClassFrom = this.leaningClasses[index]
        this.addClassFormVisible = true
      },
      addClass: function() {
        this.leaningClassFrom = {}
        this.addClassFormVisible = true
      },
      archiveClass: function(uid) {
        TeacherClassServer.archiveClassById(uid).then(res => {
          if (res.data.msg.result) {
            this.addClassFormVisible = false
            this.getLearningClass()
            this.$message({
              message: '归档成功!',
              type: 'info'
            })
          } else {
            this.$message({
              message: '归档失败!',
              type: 'warning'
            })
          }
        }).catch(err => {
          this.$message({
            message: '网络繁忙!',
            type: 'warning'
          })
        })
      },
      addLeaningClass: function () {
        let parameter = {
          objList: [
            this.leaningClassFrom
          ],
          msg: {}
        }
        TeacherClassServer.addLearningClass(parameter).then(res => {
          if (res.data.msg.result) {
            this.addClassFormVisible = false
            this.getLearningClass()
            this.$message({
              message: '添加成功!',
              type: 'info'
            })
          } else {
            this.$message({
              message: '添加失败!',
              type: 'warning'
            })
          }
        }).catch(err => {
          this.$message({
            message: '网络繁忙!',
            type: 'warning'
          })
        })
        this.addClassFormVisible = false
      },
      getLearningClass: function () {
        TeacherClassServer.getAllSimpleClassByUser().then(res => {
          this.leaningClasses = res.data.objList;
          console.log(this.leaningClasses)
        }).catch(err => {
          this.$message({
            message: '网络繁忙!',
            type: 'warning'
          })
        })
      }
    },
    mounted: function () {
      this.getLearningClass()
    }
  }
</script>

<style scoped>

  .leaningClass-main {
    margin-top: 25px;
    width: 1500px;
  }

  .class-panel {
    display: flex;
    flex-wrap: wrap;
  }

  .image {
    width: 100%;
    display: block;
  }

  .left-btn {
    cursor: pointer;
  }

  .left-btn + .left-btn {
    margin-left: 10px;
  }

</style>
