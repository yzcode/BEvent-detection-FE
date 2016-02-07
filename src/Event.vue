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
    <comp-tweet title="最新相关微博"></comp-tweet>
    <comp-trace-chart title="事件信息追踪"></comp-trace-chart>
    <comp-dist-chart title="微博地区分布"></comp-dist-chart>
  </div>
</comp-content>
</template>

<script>
var $ = require('jquery')
import navComp from './components/Nav.vue'
import navTitle from './components/Title.vue'
import compContent from './components/Content.vue'
import compTweet from './components/Content-tweet.vue'
import compTraceChart from './components/Content-event-trace-chart.vue'
import compDistChart from './components/Content-event-dist-chart.vue'
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
    compContent,
    compTweet,
    compTraceChart,
    compDistChart
  },
  ready () {
    var dataUrl = '/dist/assets/testjson/' + this.$route.params.event_id + '.json'
    $.get(dataUrl, (data, status) => {
      var tmpData = {'1': data}
      this.eventData = preEventFilter(tmpData)[1]
      var tweetUrl = '/dist/assets/testjson/' + this.$route.params.event_id + '_tweets.json'
      this.$broadcast('tweet-ready-load', tweetUrl)
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
.dist-chart-wrap{
  width: 800px;
  display: inline-block;
}
</style>
