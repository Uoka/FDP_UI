<template>
  <el-card header="test">
    <div>
      <multiple-select :table="this.$refs.table1" @returnValue="ddd"  />
    </div>
    <div>
      <el-table ref="table1" :data="datalist">
        <el-table-column label="aaa" prop="a" resizable></el-table-column>
        <el-table-column label="bbb" prop="b" resizable></el-table-column>
        <el-table-column label="ccc" prop="c" resizable></el-table-column>
        <el-table-column label="ddd" prop="d" resizable></el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
  import multipleSelect from '@/components/multipleSelect'

  export default {
    name: 'test',
    components: {
      multipleSelect
    },
    data: function () {
      return {
        datalist: [
          {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }, {
            a: 'a1',
            b: 'b1',
            c: 'c1',
            d: 'd1'
          }
        ],
        selectOption: [
          {
            label: '颜色',
            key: 'a',
          }, {
            label: '规格',
            key: 'b',
          }, {
            label: '价格',
            key: 'c',
          }
        ]
      }
    },
    methods: {
      ddd: function (ddd) {
        console.log(ddd)
      },
      dataState: function ({row, column, rowIndex, columnIndex}) {
        return dataState({row, column, rowIndex, columnIndex})
      }

    }
  }
</script>

<style scoped>

</style>
