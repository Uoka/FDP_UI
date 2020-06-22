<template>
  <div @click="toTop">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'wsCdTop',
  methods: {
    /* 返回顶部的方法 */
    toTop () {
      /* 计时器 */
      let timer = setInterval(
        function () {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if (scrollTop > 80) {
            /* 未到顶部，继续向上移动 */
            window.scroll(0, scrollTop - 80)
          } else {
            /* 到达顶部，计时终止 */
            window.scroll(0, 0)
            clearTimeout(timer)
          }
        }, 16)
    }
  }
}
</script>

<style scoped>

</style>
