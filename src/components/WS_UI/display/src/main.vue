<template>
  <div class="ws-display-main"
       v-on:mouseenter="mouseIn = true"
       v-on:mouseleave="mouseIn = false"
       :style="{
       minWidth: xLength,
       minHeight: yLength,
       margin: margin,
       borderRadius: radius,
       boxShadow: useActiveShadow?mouseIn?activeShadow:shadow:useShadow?shadow:''}">
    <span class="ws-display-bkgd"
          :style="{
          borderRadius: radius,
          backgroundColor: bkgdColor}">
    </span>
    <div class="ws-display-panel"
         :style="{
         color: textColor}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wsDisplay',
  props: {
    xLength: {
      type: String,
      default: ''
    },
    yLength: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: '#565656'
    },
    bkgdColor: {
      type: String,
      default: '#ffffff'
    },
    useShadow: {
      /* 设置是否使用阴影 */
      type: Boolean,
      default: false
    },
    useActiveShadow: {
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
    }
  },
  data () {
    return {
      mouseIn: false
    }
  }
}
</script>

<style scoped>
  .ws-display-main {
    position: relative;
  }

  .ws-display-bkgd {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .ws-display-panel {
    position: relative;
    height: 98%;
    width: 99%;
    margin: auto;
  }
</style>
