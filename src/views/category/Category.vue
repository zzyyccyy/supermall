<template>
<div class="wrapper">
  <ul class="content">
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
</ul>
</div>
</template>

<script>
 import BScroll from 'better-scroll'

export default {
  name:'Category',
  data(){
    return{
      scroll:null
    }
  },
  mounted(){
    this.scroll = new BScroll('.wrapper',{

    })
  }
}
</script>

<style scoped>
.wrapper{
  height: 150px;
  background-color: red;
  overflow: hidden;
}

</style>