<template >
<div class="content-seg">
  <div class="content-wrap">
    <slot name="content">
    </slot>
  </div>
</div>
</template>

<script>
var $ = require('jquery')
import compElist from './Content-elist.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    compElist
  }
}
$(window).scroll(() => {
  var oprate = $(window).scrollTop() / (350 - 66)
  var mgrate = -47
  if (oprate - 1 < 0) {
    mgrate *= 1 - oprate
  } else {
    mgrate = 0
  }
  $('.content-seg').css('margin-top', mgrate + 'px')
})
</script>

<style scoped>
div.content-wrap{
  max-width: 1152px;
  margin: 0 auto;
}
div.content-seg{
  min-height: 47px;
  margin-top: -47px;
  position: relative;
  padding-bottom: 24px;
  padding: 0 64px;
  overflow: hidden;
  z-index: 0;
}
</style>
