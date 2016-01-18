<template lang="jade">
div.bgimg
  div.mask
div.main-title
  div.content-wrap.opacity-anim
    h1.title-content 突发事件检测系统
    div.toolbar
      span {{time}}
</template>

<script>
export default {
  data () {
    return {
      msg: 'Brust Event Detection System DOME',
      time: '2016年1月18号'
    }
  }
}

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
