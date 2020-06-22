<template>
  <div @mouseenter="mouserEnterFun"
       @mouseleave="mouserLeaveFun"
       class="ws-nav-bar-main"
       :style="{width: mode === 'h'? xLength: yLength,
                height: mode === 'v'? xLength: yLength,
                  flexDirection: mode==='v'?'column':''}">
    <div class="ws-nav-bar-bkgd"
         :style="{backgroundColor: bkgdColor,
                opacity: bkgdOpacity}"></div>
    <div class="ws-nav-bar-first"
         :style="{flexDirection: mode==='v'?'column':'',
                    width: mode==='v'?'100%':'',
                    height: mode==='h'?'100%':''}">
      <slot name="navFirst"/>
    </div>
    <div class="ws-nav-bar-center"
         :style="{flexDirection: mode==='v'?'column':'',
                    width: mode==='v'?'100%':'',
                    height: mode==='h'?'100%':''}">
      <slot/>
    </div>
    <div class="ws-nav-bar-last"
         :style="{flexDirection: mode==='v'?'column':'',
                    width: mode==='v'?'100%':'',
                    height: mode==='h'?'100%':''}">
      <slot name="navLast"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wsNavBar',
  props: {
    xLength: {
      /* 设置导航栏宽度 */
      type: String,
      default: '100%'
    },
    yLength: {
      /* 设置导航栏高度 */
      type: String,
      default: '50px'
    },
    bkgdColor: {
      /* 设置导航栏背景颜色 */
      type: String,
      default: '#e9e9e9'
    },
    bkgdOpacity: {
      /* 设置导航栏背景透明度 */
      type: String,
      default: '1'
    },
    mode: {
      /* 设置模式 h为横向， v为纵向 */
      type: String,
      default: 'h'
    }
  },
  data () {
    return {
      mouseIn: false
    }
  },
  methods: {
    mouserEnterFun () {
      this.mouseIn = true
    },
    mouserLeaveFun () {
      this.mouseIn = false
    }
  }
}
</script>

<style scoped>
  .ws-nav-bar-main {
    display: flex;
    justify-content: center;
    align-items: stretch;
    position: relative;
  }

  .ws-nav-bar-first {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: stretch;
  }

  .ws-nav-bar-center {
    position: relative;
    display: flex;
    justify-content: stretch;
  }

  .ws-nav-bar-last {
    right: 0;
    bottom: 0;
    position: absolute;
    display: flex;
    justify-content: stretch;
  }

  .ws-nav-bar-bkgd {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
