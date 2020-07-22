<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item" />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name:"GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
  
}
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  /* 一行的item中间间隔均等分 */
  /* justify-content: space-around; */
  justify-content: space-evenly;
  /* padding: 2px; */
}

</style>