<template>
<div class="navbar">
  <div class="nav-menu-bar">
    <a v-link="{path: '/'}" style="color: white;"><i class="fa fa-bars"></i></a>
  </div>
  <div class="nav-title" >{{msg}}</div>
</div>
</template>

<script>
var $ = require('jquery')
export default {
  data () {
    return {
      msg: 'Brust Event Detection System DOME'
    }
  },
  events: {
    checkNav: () => {
      var oprate = $(window).scrollTop() / (350 - 66)
      if (oprate - 1 > 0) {
        $('div.navbar').addClass('showshadow')
        $('div.navbar').css('background-color', 'rgb(66,133,244)')
      } else {
        $('div.navbar').removeClass('showshadow')
        $('div.navbar').css('background-color', 'transparent')
      }
    }
  }
}
$(window).scroll(() => {
  var oprate = $(window).scrollTop() / (350 - 66)
  if (oprate - 1 > 0) {
    $('div.navbar').addClass('showshadow')
    $('div.navbar').css('background-color', 'rgb(66,133,244)')
  } else {
    $('div.navbar').removeClass('showshadow')
    $('div.navbar').css('background-color', 'transparent')
  }
})
</script>

<style scoped>
div.navbar{
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 66px;
  padding: 8px 12px;
  background-color: transparent;
  /*background-color: rgb(66,133,244);*/
  color: white;
}
div.navbar.showshadow{
  box-shadow: 0 4px 8px rgba(0,0,0,0.28);
}
div.nav-title{
  padding: 14px 10px 10px;
  height: 50px;
  width: 500px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Roboto',Arial,sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #EEE;
  cursor: pointer;
}
div.nav-menu-bar{
  padding: 5px;
  width: 40px;
  height: 40px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  font-size: 20px;
  border-radius: 20px;
}
div.nav-menu-bar:hover{
  cursor: pointer;
  background-color: rgb(58,117,215);
}
div.nav-menu-bar i{
  padding-top: 5px;
  vertical-align: middle;
}
</style>
