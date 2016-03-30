<template>
<div class="bgimg">
  <div class="mask"></div>
</div>
<div class="main-title">
  <div class="content-wrap opacity-anim">
    <slot name='title'></slot>
    <div class="toolbar">
      <span>{{time}}</span>
    </div>
  </div>
</div>
</template>

<script>
var $ = require('jquery')
export default {
  props: ['mainTitle'],
  data () {
    return {
      msg: 'Brust Event Detection System DOME',
      time: '2016年1月18号'
    }
  },
  events: {
    'checkTitle': () => {
      var oprate = $(window).scrollTop() / (350 - 66)
      $('div.mask').css('opacity', oprate)
      if (oprate !== 0) {
        $('.main-title>.content-wrap').css('opacity', 0)
      } else {
        $('.main-title>.content-wrap').css('opacity', 1)
      }
      console.log('checkTitle')
    }
  },
  ready () {
    var myDate = new Date()
    this.time = myDate.getFullYear() + '年' + (myDate.getMonth() + 1) + '月' + myDate.getDate() + '日'
  }
}
$(window).scroll(() => {
  var oprate = $(window).scrollTop() / (350 - 66)
  $('div.mask').css('opacity', oprate)
  if (oprate !== 0) {
    $('.main-title>.content-wrap').css('opacity', 0)
  } else {
    $('.main-title>.content-wrap').css('opacity', 1)
  }
})
</script>

<style scoped>
div.mask{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  background-color: rgb(66, 133, 244);
}
div.bgimg{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: round;
  background-image: url('/dist/assets/img/richu.jpg');
  background-color: rgb(66, 133, 244);
}
div.main-title{
  width: 100%;
  height: 350px;
  position: absolute;
  top: 0;
  padding: 64px 64px 0;
  color: white;
}
div.content-wrap{
  max-width: 1152px;
  margin: 0 auto;
  padding: 56px 0 73px;
  text-align: center;
}
.title-content{
  font-size: 35px;
}
.toolbar{
  text-align: left;
  margin-top: 38px;
}
.toolbar>span{
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  margin: 0 0 8px;
}
</style>
