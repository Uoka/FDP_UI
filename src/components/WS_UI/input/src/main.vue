<template>
  <form>
    <div v-for="item in dataObject" :key="item.name"
         class="ws-input-bar">
      <span class="ws-input-bar-left">{{item.name}} :</span>
      <div class="ws-input-bar-right" v-if="item.type==='radio'"
           :style="{width: xLength, height: yLength, margin: '5px'}">
        <label v-for="val in item.values" :key="val">
          {{val}}
          <input  type="radio"
                  name="item.name"
                  v-model="item.data"
                 :value="val"/>
        </label>
      </div>
      <div class="ws-input-bar-right" v-else-if="item.type==='checkbox'"
           :style="{width: xLength, height: yLength, margin: '5px'}">
        <label v-for="val in item.values" :key="val">
          {{val}}
          <input  type="checkbox"
                  name="item.name"
                  v-model="item.data"
                  :value="val"/>
        </label>
      </div>
      <label class="ws-input-bar-right" v-else-if="item.type==='select'">
        <select v-model="item.data" :style="{width: xLength, height: yLength,margin: '5px'}">
          <option disabled value="">请选择</option>
          <option v-for="val in item.values" :key="val">{{val}}</option>
        </select>
      </label>
      <label class="ws-input-bar-right" v-else-if="item.type==='password'">
        <input class="ws-input" type="password"
               v-model="item.data"
               :style="{width: xLength, height: yLength, fontSize: textSize}"/>
      </label>
      <label class="ws-input-bar-right" v-else >
        <input class="ws-input" type="text"
               v-model="item.data"
               :disabled="!item.edit"
               :style="{width: xLength, height: yLength, fontSize: textSize}"/>
      </label>
    </div>
    <div style="display: flex; justify-content: space-around;margin: 8px">
      <button v-for="btn in btnData" :key="btn" class="ws-input-button" @click="btn.fun(dataObject)">{{btn.name}}</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'wsInput',
  props: {
    dataObject: {
      /* 数据 */
      type: Array,
      default: () => {
        return [{'name': 'input', 'data': '', 'type': 'text', 'edit': false}]
      }
    },
    btnData: {
      /* 按钮数据 */
      type: Array,
      default: () => {
        return [
          {'name': '确认',
            'fun': (data) => {
              data.forEach((object) => {
                console.log(object.name + ':' + object.data)
              })
            },
            'use': false}
        ]
      }
    },
    fun: {
      /* 处理数据的方法 */
      type: Function,
      default: (data) => {
        data.forEach((object) => {
          console.log(object.name + ':' + object.data)
        })
      }
    },
    textSize: {
      /* 字体大小 */
      type: String,
      default: '1em'
    },
    xLength: {
      /* 输入端的宽度 */
      type: String,
      default: '180px'
    },
    yLength: {
      /* 输入端的高度 */
      type: String,
      default: '26px'
    }
  }
}
</script>

<style scoped>
  .ws-input-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2px;
  }

  .ws-input-bar-left{
    flex-grow: 1;
    text-align: right;
  }

  .ws-input-bar-right {
    margin: 0 5px;
  }

  .ws-input {
  }

  .ws-input-button {
    background-color: #2d5e90; /* Green */
    border: none;
    cursor: pointer;
    border-radius: 5px;
    color: white;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
</style>
