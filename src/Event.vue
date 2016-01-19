<template>
<div class="header">
  <div class="nav-wrap" id='spe-event-nav'>
    <nav-comp></nav-comp>
    <nav-title>
      <h1 slot="title" class="event-title">{{eventData.wordsStr}}</h1>
    </nav-title>
  </div>
</div>
<comp-content>
  <div slot="content">
  </div>
</comp-content>
</template>

<script>
var $ = require('jquery')
import navComp from './components/Nav.vue'
import navTitle from './components/Title.vue'
import compContent from './components/Content.vue'
import { preEventFilter } from './services/preEventFilter'

export default {
  data () {
    return {
      eventData: {}
    }
  },
  components: {
    navComp,
    navTitle,
    compContent
  },
  ready () {
    var dataUrl = '/dist/assets/testjson/' + this.$route.params.event_id + '.json'
    $.get(dataUrl, (data, status) => {
      var tmpData = {'1': data}
      this.eventData = preEventFilter(tmpData)[1]
    })
  }
}
</script>

<style lang="less">
@import './main.less';
.nav-wrap{
  height: 350px;
  position: relative;
}
.event-title{
  color: #fff;
  display: -webkit-box;
  direction: ltr;
  font-size: 34px;
  font-weight: 400;
  margin: 0;
  max-height: 120px;
  max-width: 760px;
  overflow-y: hidden;
  text-overflow: ellipsis;
  text-align: left;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
#spe-event-nav>div.bgimg{
  background-image: none;
}
</style>
