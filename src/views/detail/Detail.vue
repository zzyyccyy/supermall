<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- <toast :message="hello" :show="hello"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {BACKTOP_DISTANCE} from 'common/const'
import { getDetail,Goods,Shop,GoodsParam,getRecommend } from 'network/detail'
// import {debounce} from 'common/utils'
import {itemListenerMixin,backClickMixin} from 'common/mixin'

import {mapActions} from 'vuex'
// import Toast from 'components/common/toast/Toast'

export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  mixins:[itemListenerMixin,backClickMixin],
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],     //详情页导航点击跳转指定位置
      // getThemeTopY:null
      currentIndex:0,
      // isShowBackTop:false
    }
  },
  created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      // console.log(res);获取数据
      const data=res.result
        // 1获取顶部图片轮播数据
      this.topImages=data.itemInfo.topImages
        // 2获取商品信息
      this.goods =new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 3创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
        // 4获取商品详细信息
      this.detailInfo = data.detailInfo
        // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 6.取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      // 会等dom渲染完之后再来回调，就可以保证el有值。但是图片和dom加载不同步
      // 所以在监听图片加载那个方法中使用
      /* this.$nextTick(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      }) */
    })
    // 3.请求推荐数据：推荐页面展示使用GoodsList  
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })
    // 4.给getThemeTopY赋值（对themeTopYs赋值操作进行防抖）
    /* this.getThemeTopY = debounce(() =>{
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs);
    },300) */
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      // 第一种使用emit发射方法（但是会刷新次数过多）
      // this.$refs.scroll.refresh()
      // 第二种使用混入，里边添加了防抖函数
      this.newRefresh()
      // this.getThemeTopY()
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)  //为后续导航联动做判断
      // console.log(this.themeTopYs);
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,300)
    },
    // 监听滚动事件，和导航产生联动
    contentScroll(position){
      // 1.获取y值
      const positionY = -position.y
      // 2.positionY和themeTopYs中的值进行对比
      let length = this.themeTopYs.length-1
      for(let i=0;i<length;i++){ 
        if(this.currentIndex !== 1 && (positionY >= this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
          this.currentIndex = i   //记录一下，不让计算机打印太多次
          // 赋值给detailNavBar中的currentIndex
          this.$refs.nav.currentIndex = this.currentIndex
        }
      /* if(this.currentIndex!==i && ((i<length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i===length-1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i   //记录一下，不让计算机打印太多次
          //赋值给detailNavBar中的currentIndex
          this.$refs.nav.currentIndex = this.currentIndex
        } */
      }
      // 3.是否显示回到顶部
      this.isShowBackTop =(-position.y) > BACKTOP_DISTANCE
    },
    addToCart(){//点击购物车进行的事件
      // 1.获取购物车需要展示的信息
      const product ={}
      product.image =this.topImages[1]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 2.将商品添加到购物车
      // this.$store.commit('addCart',product)
      /* this.$store.dispatch('addCart',product).then(res =>{
        console.log(res);
      }) */
      // 映射写法mapActions
      this.addCart(product).then(res =>{
        // console.log(this.$toast);
        this.$toast.show()
      })
      // 3.添加购物车成功👆：dispatch会返回一个promise函数，然后在then中执行resolve
    }
  },
  /* mounted(){
    this.$bus.$on('itemImageLoad',)
  }, */
 /*  updated(){
    //因为updated会数次更新。赋值为空则不会影响下次更新，不会push进去很多值
    this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs);
  }, */
  destroyed(){
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px);
}
</style>