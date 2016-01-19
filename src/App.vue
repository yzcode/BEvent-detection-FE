<template>
<div class="header">
  <div class="nav-wrap">
    <nav-comp></nav-comp>
    <nav-title></nav-title>
  </div>
</div>
<div class="content-seg">
  <comp-content>
    <comp-elist slot="content"></comp-elist>
  </comp-content>
</div>
</template>

<script>
var $ = require('jquery')
import navComp from './components/Nav.vue'
import navTitle from './components/Title.vue'
import compContent from './components/Content.vue'
import compElist from './components/Content-elist.vue'
export default {
  data () {
    return {
      msg: 'Hello from vue-loader!'
    }
  },
  components: {
    navComp,
    navTitle,
    compContent,
    compElist
  }
}
$(window).scroll(() => {
  var oprate = $(window).scrollTop() / (350 - 66)
  $('div.mask').css('opacity', oprate)
  var mgrate = -47
  if (oprate - 1 < 0) {
    mgrate *= 1 - oprate
  } else {
    mgrate = 0
  }
  $('.content-seg').css('margin-top', mgrate + 'px')
  if (oprate !== 0) {
    $('.main-title>.content-wrap').css('opacity', 0)
  } else {
    $('.main-title>.content-wrap').css('opacity', 1)
  }
  if (oprate - 1 > 0) {
    $('div.navbar').addClass('showshadow')
    $('div.navbar').css('background-color', 'rgb(66,133,244)')
  } else {
    $('div.navbar').removeClass('showshadow')
    $('div.navbar').css('background-color', 'transparent')
  }
})
</script>

<style lang="stylus">
font-stack = 'Roboto',Arial,sans-serif
primary-color = #EEE
body
  margin 0
  font 100% font-stack
  background-color primary-color
*
  box-sizing: border-box;
h1
  font-size 28px
  font-weight 400
  margin 0
.content-seg
  min-height 47px
  margin-top -47px
  position relative
  padding-bottom 24px
  padding 0 64px
  overflow: hidden;
  z-index: 0;

.nav-wrap
  height 350px
  position relative
.generic-separator
  border-bottom 1px solid #e0e0e0
a
  background transparent
  outline none
.opacity-anim
  opacity 1
  transition opacity .1s ease-out
</style>
