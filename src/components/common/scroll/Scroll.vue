<template>
<!-- ref -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:"Scroll",
  // 可以在外部调用，这样利于封装
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  methods:{
    // 自定义事件，内部调用scroll对应方法
    // es6中可以传默认值
    scrollTo(x,y,time=300){ //回到顶部
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      // console.log('-----');
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted(){
    // 通过query方式拿到的数据可能不唯一
    // this.scroll = new BScroll(document.querySelector('.wrapper'),{
      // 1.创建监听对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        // 不直接使用，而是生成一个属性，便于不同组件调用修改值
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })
      // 2.监听滚动位置
      if(this.probeType ===2 ||this.probeType ===3){
          this.scroll.on('scroll',(position)=>{
          // 将监听的东西传出，父组件谁想用就@绑定使用
          this.$emit('scroll',position)   
        })
      }
      // 3.监听scroll滚动到底部
      if(this.pullUpLoad){
          this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
  }
}
</script>

<style scoped>


</style>