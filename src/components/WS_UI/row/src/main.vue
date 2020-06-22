<template>
  <div class="wsh-row"
       ref="rowWindow"
       @mousemove="mouseOn"
       @mouseleave="mouseOut"
       :style="{
       height: yLength,
       width: xLength,
       backgroundColor: bakColor,
       margin: margin,
       borderRadius: radius,
       boxShadow: useShadow?shadow:'',
       justifyContent: justify,
       alignItems: align,
       order: order,
       flexGrow: flexGrow
       }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'wsRow',
  props: {
    yLength: {
      /* 设置高度 */
      type: String,
      default: ''
    },
    xLength: {
      /* 设置宽度 */
      type: String,
      default: ''
    },
    bakColor: {
      /* 设置背景颜色 */
      type: String,
      default: ''
    },
    useShadow: {
      /* 设置是否使用阴影 */
      type: Boolean,
      default: false
    },
    margin: {
      /* 设置margin值 */
      type: String,
      default: '10px'
    },
    shadow: {
      /* 设置默认阴影 */
      type: String,
      default: '0 3px 10px #888888'
    },
    activeShadow: {
      /* 设置激活时的阴影 */
      type: String,
      default: '0 6px 15px #888888'
    },
    radius: {
      /* 设置圆角 */
      type: String,
      default: ''
    },
    justify: {
      /* 设置justify值 */
      type: String,
      default: 'center'
    },
    align: {
      /* 设置align值 */
      type: String,
      default: 'center'
    },
    order: {
      /* 设置order值 */
      type: Number,
      default: 0
    },
    flexGrow: {
      /* 设置flex-grow值 */
      type: Number,
      default: 0
    }
  },
  methods: {
    mouseOn () {
      if (this.useShadow) {
        this.$refs.rowWindow.style.boxShadow = this.activeShadow
      }
    },
    mouseOut () {
      if (this.useShadow) {
        this.$refs.rowWindow.style.boxShadow = this.shadow
      }
    }
  }
}
</script>

<style scoped>
  .wsh-row {
    display: flex;
    overflow: hidden;
  }
</style>
