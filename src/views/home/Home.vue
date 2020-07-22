<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control @tabClick="tabClick" :titles="['流行','新款','精选']" 
    ref="tabControl1" class="tab-control" v-show="isTabFixed" />

    <scroll class="content" ref="scroll" 
    :probe-type="3" @scroll="contentScroll"
    :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control @tabClick="tabClick" :titles="['流行','新款','精选']" 
      ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/content/backTop/BackTop'

import {BACKTOP_DISTANCE} from 'common/const'

import {getHomeMD,getHomeGoods} from 'network/home'
// import {debounce} from 'common/utils'
import {itemListenerMixin,backClickMixin} from 'common/mixin'

export default {
  name:'Home',
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins:[itemListenerMixin,backClickMixin],
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page: 0,list: []},
        'new':{page: 0,list: []},
        'sell':{page: 0,list: []},
      },
      currentType:'pop',    //记录选中谁了（流行/新款/精选）
      // isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
      // itemImgListener:null
    }
  },
  methods: {
    // 事件监听相关的方法
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
      this.$refs.tabControl1.currentType=index
      this.$refs.tabControl2.currentType=index
    },
    /* backClick(){
      // 第一个scroll是ref属性，第二个是获取的文件中data对象
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      // 面向组件开发思想，在Scroll.vue中封装的方法
      this.$refs.scroll.scrollTo(0,0)
    }, */
    contentScroll(position){
      // 1. 判断BackTop是否显示
      this.isShowBackTop =(-position.y) > BACKTOP_DISTANCE
      // 2.决定tabControl是否吸顶（position：fixed）
      this.isTabFixed =(-position.y) > this.tabOffsetTop
    },
    // 上拉加载更多
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    },
    swiperImageLoad(){
      // 获取tabControl的offsetTop
    // 所有的组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    
    // 网络请求相关的方法
    getHomeMD(){
      getHomeMD().then(res =>{
        // console.log(res);
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1
       getHomeGoods(type,page).then(res => {
      // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
        // this.$refs.scroll.finishPullUp()
      })
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated(){      //进来的时候
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh() //刷新一次避免出现问题
  },
  deactivated(){    //组件点击离开时（保存离开位置和状态）
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 2.取消全局事件监听，第二个参数指明取消监听的事件(detail也有此函数，防止多次刷新)
    // 一离开就取消
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  created(){
    // 1.请求多个数据
    this.getHomeMD()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // 不在这监听
  },
  // 在mounted监听能保证拿到的scroll是有值的
  /* mounted(){
    // 1.防抖监听goods图片（需要一创建好created就开始监听）
    const refresh= debounce(this.$refs.scroll.refresh,500)
    // 对监听的事件进行保存，以便取消监听
    this.itemImgListener = () =>{
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }, */
  
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:white;
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content{
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9 ;
}

/* .content{
  height: calc(100% - 49px); 
  margin-top: 44px;
} */

</style>