<template>
<div class="navbar">
  <div class="nav-menu-bar">
    <a v-link="{path: '/'}" style="color: white;"><i class="fa fa-bars"></i></a>
    <ul id="main_menu">
      <li>
        <a v-link="{path: '/'}">突发事件监测</a>
      </li>
      <li>
        <a v-link="{path: '/TraceList'}">跟踪事件监测</a>
      </li>
    </ul>
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
div.nav-menu-bar:hover #main_menu{
  display: block!important;
}
ul#main_menu{
  position: absolute;
  display: none;
  margin-top: 0;
  background-color: #fff;
  top: 50px;
  left: 20px;
  z-index: 1000;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0,0,0,0.175);
  box-shadow: 0 6px 12px rgba(0,0,0,0.175);
  background-clip: padding-box;
  text-align: left;
  /*border-top-left-radius: 0;*/
  /*border-top-right-radius: 0;*/
}
#main_menu li a{
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.428571429;
  color: #333;
  white-space: nowrap;
  text-decoration: none;
}
#main_menu li a:hover{
  color: #262626;
  text-decoration: none;
  background-color: #f5f5f5;
}
</style>
