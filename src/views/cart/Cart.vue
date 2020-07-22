<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品的列表展示 -->
    <!-- <scroll class="content"><cart-list/></scroll> -->
    <cart-list/>

    <!-- 底部汇总栏 -->
      <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

// import Scroll from 'components/common/scroll/Scroll'

import { mapGetters } from 'vuex'

export default {
  name:"Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
    // Scroll
  },
  computed:{
    // 辅助函数将store中的getters映射到局部计算属性computed
    // 1.原名使用
    ...mapGetters(['cartLength'])
    // 2.可自定义命名
    /* ...mapGetters({
      length:'cartLength',
      list:'cartList'
    }) */
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
/* .content{
  height: calc(100% -44px - 49px);
} */

</style>