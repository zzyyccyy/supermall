<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'

export default {
  name:"HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    // 监听轮播图加载是否完成，便于tabControl计算高度呈现吸顶效果
    imageLoad(){
      // 轮播图有四张会加载四次，这里只需要高度，所以加载一次即可，使用isLoad控制加载一次
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad=true
      }
    }
  }
}
</script>

<style>

</style>