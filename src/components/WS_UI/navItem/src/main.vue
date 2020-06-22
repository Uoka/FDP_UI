<template>
  <div class="ws-nav-item"
       v-on:mouseenter="mouseIn = true"
       v-on:mouseleave="mouseIn = false"
       :style="{backgroundColor:mouseIn?activeBkgdColor:bkgdColor,
                opacity: bkgdOpacity,
                width: xLength,
                height: yLength}">
    <router-link tag="div"
                 :active-class="activeRouter?'wsh-nav-item-router-active':''"
                 :style="{display: 'flex',
                 fontSize: textSize,
                 justifyContent: 'center',
                 alignItems: 'center',
                 flexGrow: 1,
                 padding: '15px',
                 position: 'relative',
                 cursor: 'pointer'}"
                 :to="linkTo">
      <span class="ws-nav-item-bkgd"
            :style="{backgroundColor:activeBkgdColor,
                opacity: bkgdOpacity,}"/>
      <div class="ws-nav-item-slot"
            :style="{color:textColor}">
        <slot/>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'wsNavItem',
  props: {
    xLength: {
      /* 设置x轴长度 */
      type: String,
      default: ''
    },
    yLength: {
      /* 设置y轴长度 */
      type: String,
      default: ''
    },
    textSize: {
      /* 设置字体大小 */
      type: String,
      default: '25px'
    },
    textColor: {
      /* 设置字体颜色 */
      type: String,
      default: '#000000'
    },
    bkgdColor: {
      /* 设置背景颜色 */
      type: String,
      default: ''
    },
    activeBkgdColor: {
      /* 设置激活时的背景颜色 */
      type: String,
      default: '#d4d4d4'
    },
    bkgdOpacity: {
      /* 设置背景透明度 */
      type: String,
      default: '1'
    },
    linkTo: {
      /* 设置导航 */
      type: Object,
      default: () => {
        return {name: ''}
      }
    },
    activeRouter: {
      type: Boolean,
      default: false
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
  .ws-nav-item {
    display: flex;
    justify-content: center;
    align-items: stretch;
    position: relative;
  }

  .wsh-nav-item-router-active :first-child {
    display: block;
  }

  .ws-nav-item-bkgd {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .ws-nav-item-slot {
    position: relative;
  }
</style>
