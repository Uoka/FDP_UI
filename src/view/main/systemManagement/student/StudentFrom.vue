<template>
  <div>
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'homepage' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'student_list' }">学生管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{uid?'修改':'新增'}}学生</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="from-panel">
        <el-form ref="studentFrom" :model="student">
          <el-row :gutter="35">
            <el-col :span="11">
              <el-form-item prop="name" label="姓名" label-width="150px">
                <el-input v-model="student.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="sex" label="性别" label-width="150px">
                <el-select v-model="student.sex" placeholder="请选择性别" style="width: 100%">
                  <el-option label="男" value="男"/>
                  <el-option label="女" value="女"/>
                  <el-option label="不确定" value=""/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="age" label="年龄" label-width="150px">
                <el-select v-model="student.age" placeholder="请选择年龄" style="width: 100%">
                  <el-option
                    v-for="item in 120"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="studentCode" label="学号" label-width="150px">
                <el-input v-model="student.studentCode"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="studentGrade" label="年级" label-width="150px">
                <el-input v-model="student.studentGrade"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="studentClass" label="班级" label-width="150px">
                <el-input v-model="student.studentClass"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="startYear" label="入学年份" label-width="150px">
                <el-date-picker
                  style="width: 100%"
                  v-model="student.startYear"
                  type="year"
                  value-format="yyyy"
                  placeholder="选择入学年份">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="phone" label="手机号码" label-width="150px">
                <el-input v-model="student.phone"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="email" label="邮箱" label-width="150px">
                <el-input v-model="student.email"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="hobby" label="兴趣" label-width="150px">
                <el-select
                  style="width: 100%"
                  v-model="hobbies"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择兴趣">
                  <el-option
                    v-for="item in hobbyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item prop="remark" label="备注" label-width="150px">
                <el-input type="textarea" :rows="2" v-model="student.remark"/>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item prop="file" label="学生照片" label-width="150px">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action=""
                  :on-change="uploadChange"
                  :file-list="fileList"
                  :limit="1"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取学生照片</el-button>
                  <el-button v-if="imageUrl" style="margin-left: 10px;" size="small" type="danger"
                             @click="delStudentImg">删除照片
                  </el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
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
  import {StudentServer} from '@/view/main/systemManagement/student/StudentServer'
  import {annexService} from '@/tools/AnnexService'

  export default {
    data() {
      return {
        uid: null,
        hobbies: [],
        hobbyOptions: [
          {
            label: '唱',
            value: '唱'
          }, {
            label: '跳',
            value: '跳'
          }, {
            label: 'rap',
            value: 'rap'
          }
        ],
        student: {},
        imageUrl: '',
        fileList: []
      }
    },
    methods: {
      getParm() {
        this.student.hobby = JSON.stringify(this.hobbies)
        return {
          objList: [
            this.student
          ]
        }
      },
      cancel() {
        this.$router.push({name: 'student_list'})
      },
      uploadChange(file, fileList) {
        this.fileList = fileList
      },
      confirm() {
        let parm = this.getParm()
        if (this.uid) {
          StudentServer.updateStudent(parm).then((res) => {
            this.uploadFile(res.data)
          }).catch(err => {
            console.log(err)
            alert('网络繁忙')
          })
        } else {
          StudentServer.addStudent(parm).then(() => {
            this.uploadFile(res.data)
          }).catch(err => {
            console.log(err)
            alert('网络繁忙')
          })
        }
      },
      uploadFile(data) {
        if (data.msg.res) {
          let fileUploadDTO = data.msg.fileUploadDTO
          annexService.uploadStudentImg(fileUploadDTO, this.fileList)
        }
        this.$router.push({path: '/student'})
      },
      delStudentImg() {
        let imgName = this.imageUrl.split('=')[1]
        annexService.delStudentImg(imgName).then(res => {
          this.getStudentById(this.uid)
          this.$message({
            message: res.data,
            type: 'warning'
          })
        }).catch(err => {
          this.$message({
            message: '网络繁忙!',
            type: 'warning'
          })
        })
      },
      getStudentById(uid) {
        StudentServer.getStudentById(uid).then(res => {
          this.student = res.data.objList[0]
          if (res.data.msg.imageUrl) {
            this.imageUrl = process.env.BASE_API + res.data.msg.imageUrl
          } else {
            this.imageUrl = ''
          }
          this.hobbies = JSON.parse(this.student.hobby)
        }).catch(err => {
          console.log(err)
          alert('网络繁忙')
        })
      }
    },
    mounted() {
      this.uid = this.$route.params.uid
      if (this.uid && this.uid > 0) {
        this.getStudentById(this.uid)
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
