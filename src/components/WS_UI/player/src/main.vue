<template>
  <div>
    <video :height="yLength" controls>
      <source :src="videoSrc" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'wsPlayer',
  props: {
    xLength: {
      /* 设置组件的宽度 */
      type: String,
      default: '704px'
    },
    yLength: {
      /* 设置组件的高度 */
      type: String,
      default: '480px'
    },
    videoSrc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
