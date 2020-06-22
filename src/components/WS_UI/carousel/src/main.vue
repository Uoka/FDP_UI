<template>
  <div class="ws-carousel"
       v-on:mouseenter="hover = true"
       v-on:mouseleave="hover = false">
    <div class="window"
         ref="window"
         :style="{height: panelHeight, width:panelWeight}">
      <div class="list"
           ref="list"
           :style="{width: listWidth + 'px', left: '-' + panelWeight}">
        <slot></slot>
      </div>
    </div>
    <div class="carousel-btn">
      <img src="../assets/fy_ic_left.png" alt="left" v-on:click="next(-1)">
      <img src="../assets/fy_ic_right.png" alt="right" v-on:click="next(1)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'wsCarousel',
  props: {
    panelHeight: {
      /* 设置高度 */
      type: String,
      default: '200px'
    },
    panelWeight: {
      /* 设置宽度 */
      type: String,
      default: '400px'
    },
    speed: {
      /* 设置速度 */
      type: Number,
      default: 60
    },
    time: {
      /* 设置切换的间隔 */
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      turn: 0,
      number: 0,
      widowsWidth: 0,
      hover: false,
      listWidth: 0
    }
  },
  mounted () {
    this.widowsWidth = this.$refs.window.offsetWidth
    this.number = this.$refs.list.children.length
    this.listWidth = this.widowsWidth * this.number
    for (let i = 0; i < this.number; i++) {
      this.$refs.list.children[i].children[0].style.xLength = this.widowsWidth + 'px'
      this.$refs.list.children[i].style.order = '' + (i + 1)
    }
    this.$refs.list.children[this.number - 1].style.order = '0'
    this.carouselStart()
  },
  methods: {

    carouselStart: function () {
      let that = this
      setInterval(function () {
        if (!that.hover) {
          that.next(1)
        }
      }, that.time)
    },
    next: function (next) {
      let width = this.widowsWidth
      let number = this.number
      let speed = this.speed
      let turn = this.turn + next
      if (turn < 0) {
        turn = number - 1
      } else if (turn >= number) {
        turn = 0
      }
      this.turn = turn
      let m = width / speed * -next
      let list = this.$refs.list
      let j = 0

      let timer = setInterval(
        function () {
          if (j < speed) {
            list.style.left = (m * j - width) + 'px'
            j++
          } else {
            /* 修正排序 */
            for (let i = 0; i < number; i++) {
              let n = turn + i - 1
              if (n < 0) {
                n = number - 1
              } else if (n >= number) {
                n = n % number
              }
              list.children[n].style.order = '' + i
            }
            list.style.left = -width + 'px'
            clearTimeout(timer)
          }
        }, 5)
    }
  }
}
</script>

<style scoped>
  .ws-carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .ws-carousel .window {
    display: flex;
    align-items: stretch;
    background-color: #6e6e6e;
    position: relative;
    overflow: hidden;
  }

  .ws-carousel .list {
    display: flex;
    align-items: stretch;
    position: absolute;
    height: 100%;
    left: 0;
  }

  .ws-carousel .carousel-btn {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ws-carousel .carousel-btn > img {
    margin: 10px;
    cursor: pointer;
    width: 60px;
    height: 60px;
  }
</style>
