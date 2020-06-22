<template>
  <div>

    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'homepage' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-row>
        <el-col>
          <div style="display: flex;justify-content: flex-end;margin-bottom: 15px">
            <el-button type="danger" plain @click="batchDeletionRole">批量删除</el-button>
            <el-button type="success" style="background-color: #42b983" @click="addRole">新增</el-button>
          </div>
        </el-col>
        <el-table :data="roles"
                  @selection-change="handleSelectionChange"
                  :header-cell-style="{background:'#d1d1d1',color: '#303133'}">
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column prop="name" min-width="150" label="名称" fixed="left"/>
          <el-table-column prop="remark" min-width="150" label="备注"/>
          <el-table-column label="操作" min-width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="updateRole(scope.row.uid)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="delRole(scope.row.uid)">删除
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
  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        totalCount: 1,
        roles: [],
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
    }
  }
</script>

<style scoped>

</style>
