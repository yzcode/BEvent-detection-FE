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
    <div class="chart-wrap">
      <comp-dist-chart title="微博地区分布"></comp-dist-chart>
      <comp-emotion-chart title="情感状态分布"></comp-emotion-chart>
    </div>
    
  </div>
</comp-content>
</template>

<script>
var $ = require('jquery')
var globalConfig = require('./services/globalConfig')
import navComp from './components/Nav.vue'
import navTitle from './components/Title.vue'
import compContent from './components/Content.vue'
import compTweet from './components/Content-tweet.vue'
import compTraceChart from './components/Content-event-trace-chart.vue'
import compDistChart from './components/Content-event-dist-chart.vue'
import compEmotionChart from './components/Content-event-emotion-chart.vue'
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
    compDistChart,
    compEmotionChart
  },
  ready () {
    var dataUrl = globalConfig.jsonServerUrl + '/get_single_event/' + this.$route.params.event_id
    var tweetUrl = globalConfig.jsonServerUrl + '/get_tweets_by_eventid/' + this.$route.params.event_id
    $.get(dataUrl, (data, status) => {
      if (typeof data === 'string') {
        data = JSON.parse(data)
      }
      var tmpData = {'1': data}
      this.eventData = preEventFilter(tmpData)[1]
      var trackUrl = globalConfig.jsonServerUrl + '/get_events_by_parentid/' + data.parent_id
      $.get(trackUrl, (trackData, status) => {
        if (typeof trackData === 'string') {
          trackData = JSON.parse(trackData)
        }
        this.$broadcast('trace-ready-load', trackData)
        // trackData.burst_events_objectid.sort().reverse()
        // console.log(trackData)
      })
    })
    $.get(tweetUrl, (data, status) => {
      this.$broadcast('tweet-ready-load', data)
      this.$broadcast('emotionpie-ready-load', data)
      this.$broadcast('dist-ready-load', data)
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
  width: 650px;
  display: inline-block;
}
.emotion-chart-wrap{
  display: inline-block;
  vertical-align: top;
  position: absolute;
  right: 0;
  left: 670px;
}
.chart-wrap{
  position:relative;
}
</style>
