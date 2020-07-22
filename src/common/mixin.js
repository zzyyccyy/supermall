import {debounce} from "./utils" 

import BackTop from 'components/content/backTop/BackTop'


export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted(){
    // 1.防抖监听goods图片（需要一创建好created就开始监听）
    this.newRefresh= debounce(this.$refs.scroll.refresh,500)
    // 对监听的事件进行保存，以便取消监听
    this.itemImgListener = () =>{
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    // console.log('nihao');
  }
}
// 返回顶部的共同代码
export const backClickMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
  }
}
