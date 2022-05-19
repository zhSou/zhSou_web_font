<template>
  <div class="layout">
    <!-- 背景组件特效 -->
    <vue-particles
      color="#fff"
      :particleOpacity="0.5"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="false"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
      class="lizi" >
    </vue-particles>
    <!-- 主要显示界面 -->
    <div class="mainView">
      <el-container>
        <!-- 导航标题头 -->
        <el-header>
          <!-- 引入导航自定义组件 -->
          <search-head></search-head>
        </el-header>
        <!-- 主界面显示区域 -->
        <el-main>
          <!-- 根据路由跳转显示不同页面 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
// 引入头部导航组件
import SearchHead from '@/components/SearchHead.vue'
// import SearchMain from '@/views/SearchMain.vue'

export default {
  name: 'LAYOUT',
  components: {
    SearchHead
  }
}
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
}
.lizi {
  width: 100%;
  height: 100%;
  background-color: black;
  position:fixed;
}
.mainView {
  position: relative;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #131313;
  box-shadow: 0 2px 10px 0 rgb(248 248 255);
  opacity: 0.8;
}
.el-main {
  height: 100%;
  width: 100%;
}
</style>
