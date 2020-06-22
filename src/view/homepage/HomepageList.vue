<template>
  <div class="list-pane">
    <div class="plane1">
      <el-carousel height="520px">
        <el-carousel-item>
          <img style="width: 100%;height: 100%" src="../../assets/homepage/homepage1.png" alt="1">
        </el-carousel-item>
        <el-carousel-item>
          <img style="width: 100%;height: 100%" src="../../assets/homepage/homepage2.png" alt="2">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="plane2">
      <div style=" display:flex; flex-wrap:wrap; justify-content: space-between; width:1000px;">
        <div v-for="num in 8" style="width: 200px;margin: 10px">
          <el-card shadow="hover">
            <span style="font-size: 1.2em;margin: auto;">极简教学主义{{num}}</span>
            <p style="color: #8c939d;text-indent:2em">无安装，无插件，无需专门学习；掌握简单，三分钟上手；上传一个课件，即可开启精彩的课堂</p>
          </el-card>
        </div>
      </div>
    </div>
    <div>2</div>
  </div>
</template>

<script>
  export default {
    name: 'homePageList'
  }
</script>

<style scoped>

  .list-pane {
  }

  .plane2 {
    display: flex;
    justify-content: center;
  }

</style>
