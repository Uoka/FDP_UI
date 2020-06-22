<template>
  <div :style="{width: width}">
    <div class="tag-panel">
      <el-tag v-for="(option, index) in selectOption"
              :key="option.key"
              v-if="option.content"
              closable
              size="mini"
              @close="removeCondition(index)"
              :disable-transitions="false">
        {{option.label + '：' + option.content}}
      </el-tag>
    </div>
    <div class="select-input-panel">
      <el-input clearable
                v-model="inputData"
                :placeholder="placeholder || getPlaceholder"
                @keyup.enter.native="searchByCondition">
        <el-select v-model="selectedKey"
                   class="select-input-down"
                   placeholder="请选择查询列"
                   clearable
                   @change="changeSelect"
                   slot="prepend" value="">
          <el-option
            v-for="item in selectOption"
            :key="item.key"
            :label="item.label"
            :value="item.key">
          </el-option>
        </el-select>
        <el-button slot="append"
                   icon="el-icon-plus"
                   @click="addCondition">
        </el-button>
        <el-button slot="append"
                   icon="el-icon-search"
                   @click="searchByCondition">
        </el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'multipleSelect',
    props: {
      width: {
        type: String,
        default: '550px'
      },
      placeholder: {
        type: String,
        default: ''
      },
      selectOption: {
        type: Array,
        default() {
          return []
        }
      },
      table: ''
    },
    data: function () {
      return {
        selectedKey: '',
        inputData: ''
      }
    },
    mounted: function () {
      for (let i = 0, len = this.selectOption.length; i < len; i++) {
        this.$set(this.selectOption[i], 'content', '')
      }
    },
    computed: {
      getPlaceholder: function () {
        for (let i = 0, len = this.selectOption.length; i < len; i++) {
          if (this.selectOption[i].key === this.selectedKey) {
            return '请输入' + this.selectOption[i].label
          }
        }
        return '请先选择一列进行搜索'
      }
    },
    watch: {
      'table': function (newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          if (newVal && newVal.columns) {
            this.selectOption = []
            newVal.columns.forEach(column => {
              if (column.label && column.label !== '操作' && column.label !== '选择') {
                let option = {}
                this.$set(option, 'label',  column.label)
                this.$set(option, 'key',  column.property)
                this.$set(option, 'content',  "")
                this.selectOption.push(option)
              }
            })
          }
        }
      }
    },
    methods: {
      removeCondition: function (index) {
        this.selectOption[index].content = ''
      },
      addCondition: function () {
        if (this.inputData) {
          for (let i = 0; i < this.selectOption.length; i++) {
            if (this.selectOption[i].key === this.selectedKey) {
              this.selectOption[i].content = this.inputData
              break
            }
          }
        }
      },
      changeSelect: function (key) {
        if (key) {
          for (let i = 0; i < this.selectOption.length; i++) {
            if (this.selectOption[i].key === key) {
              this.inputData = this.selectOption[i].content
              return
            }
          }
        } else {
          this.inputData = ''
        }
      },
      searchByCondition: function () {
        if (this.selectedKey && this.inputData) {
          this.addCondition()
          let selectList = []
          this.selectOption.forEach(option => {
            if (option.content) {
              selectList.push({
                key: option.key,
                content: option.content
              })
            }
          })
          this.$emit('returnValue', selectList)
        }
      }
    }
  }
</script>

<style scoped>

  .el-tag {
    margin-bottom: 5px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }


  .select-input-panel /deep/ .el-input-group__prepend {
    width: 130px;
    background-color: #fff;
  }

  .select-input-panel /deep/ .el-input-group__append {
    /*width: 10px;*/
  }

  .select-input-panel /deep/ .el-button {
    border-radius: 0;
  }

</style>



