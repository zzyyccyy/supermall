<template>
  <div class="cart-list">
    <scroll class="content" ref="scrollRefresh">
      <cart-list-item v-for="(item,index) in cartList" :item-info="item" :key="index"/>
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import Scroll from 'components/common/scroll/Scroll'

import {mapGetters} from 'vuex'

export default {
  name:"CartList",
  components:{
    CartListItem,
    Scroll
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated(){
    // 向购物车中添加商品，better-scroll无法知道，所以需要刷新，才能获取scrollHeight
    this.$refs.scrollRefresh.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100% -44px - 49px - 40px); 
  /* height: 100vh; */
}
.content{
  /* height: calc(100% -44px - 49px); */
  height: 100%;
  overflow: hidden;
}

</style>