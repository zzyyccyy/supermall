<template>
  <div id="app">
    <!-- 路由每次跳转完后，前一个组件会被销毁，阻止销毁使用keep-alive -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name:'App',
  components:{
    MainTabBar
  }
}
</script>

<style>
@import url("assets/css/base.css");
</style>