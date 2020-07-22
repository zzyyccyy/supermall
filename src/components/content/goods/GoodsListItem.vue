<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      // 因为两个地方用到了GoodsList组件，所以拿数据的格式不一样，需要做判断
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    imageLoad(){
      // 第二种方法mixin
      this.$bus.$emit('itemImageLoad')
      // $bus向vuex储存东西，这个父组件的父组件Home.vue就可以共同调用
      // 第一种方法：（由于主页和详情页推荐都调用了，所以防止一个调用时，而刷新另一个）
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit('homeItemImgLoad')
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit('detailImageLoad')
      // }
    },
    // 监听goodsitem是为了跳转详情页
    itemClick(){
      // iid是每个goodsItem传过来的id
      this.$router.push('/detail/' + this.goodsItem.iid)
      // 第二种方法，记得路由中要删除:iid
      // this.$router.push({
      //   path:'/detail',
      //   query:{
      //     iid:this.product.iid
      //   }
      // })
    },
  }
}
</script>

<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>