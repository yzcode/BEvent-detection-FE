<template>
<content-frame spe-name="event-list">
  <div slot="title">
    {{title}}
    <span class="sys-status" >
      {{tipWord}}
      <span class="fa fa-refresh normal"></span>
    </span>
  </div>
  <div slot="content">
    <div v-for="event in events | orderBy 'tweet_rate' -1" class="list-item">
      <div class="event-wrap">
        <a v-if="!isTrace" class="event-cont" v-link="{ name: 'event', params: { event_id: event._id }}">
          <div class="index"></div>
          <div class="title">
            <span>{{event.wordsStr}}</span>
          </div>
          <div class="followers">
            <span>{{event.tweet_rate}}</span>
            <div class="label">{{rateLabel}}</div>
          </div>
          <div class="img-wrap">
            <img class="event-img" src="{{event.img_url}}">
            <div class="event-img-label">
              <span>{{event.img_label}}</span>
            </div>
          </div>
        </a>
        <a v-if="isTrace" class="event-cont" v-link="{ name: 'traceevent', params: { Trace_id: event._id }}">
          <div class="index"></div>
          <div class="title">
            <span>{{event.wordsStr}}</span>
          </div>
          <div class="followers">
            <span>{{event.tweet_rate}}</span>
            <div class="label">{{rateLabel}}</div>
          </div>
          <div class="img-wrap">
            <img class="event-img" src="{{event.img_url}}">
            <div class="event-img-label">
              <span>{{event.img_label}}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</content-frame>
</template>

<script>
var $ = require('jquery')
var formulaSet = require('../services/formula')
var globalConfig = require('../services/globalConfig')
import contentFrame from './Content-frame.vue'
import { preEventFilter } from '../services/preEventFilter'
export default {
  props: ['dataUrl', 'title', 'tipWord', 'rateLabel'],
  data () {
    return {
      events: [],
      isTrace: false
    }
  },
  methods: {
    bodyTop: function (event) {
      $('body').scrollTop = 0
    }
  },
  ready () {
    var testLabel = ['特朗普', 'NOLA.com', 'News24', 'PC Magazine']
    this.dataUrl = globalConfig.jsonServerUrl + this.dataUrl + 1434891000
    // this.dataUrl = this.dataUrl + Math.ceil((new Date()).valueOf() / 1000 - 10 * 60)
    if (this.title === '持续追踪事件') {
      this.dataUrl = this.dataUrl + '/1434977400'
      this.isTrace = true
    }
    $.get(this.dataUrl, (data, status) => {
      data = preEventFilter(data)
      this.events = []
      for (var i in data) {
        data[i].tweet_rate = formulaSet.getHotRate(data[i].burst_tweets_count, data[i].sum_tweets_count)
        data[i].img_url = '/dist/assets/img/' + (i % 4 + 1) + '.jpg'
        data[i].img_label = testLabel[i % 4]
        this.events.push(data[i])
      }
    }).fail(() => {
      this.tipWord = '系统状态：异常'
      $('span.sys-status>span').removeClass('normal')
    })
  },

  components: {
    contentFrame
  }
}
</script>

<style scoped>
.event-list-container .list-item{
  background: white;
  display: block;
  padding-left: 24px;
  position: relative;
  height: 96px;
}
.event-list-container .list-item:hover{
  padding-left: 0px;
  cursor: pointer;
}
.event-cont{
  display: block;
  min-height: 96px;
  position: relative;
  text-decoration: none;
  counter-increment: storyIndex;
  border-bottom: 1px solid #e0e0e0;
}
.list-item:hover .event-cont{
  background-color: #fafafa;
}
.event-cont .index:before{
  content: counter(storyIndex);
  color: rgba(0,0,0,0.87);
  font-size: 20px;
  position: absolute;
  top: 36px;
}
.list-item:hover .index{
  padding-left: 24px;
}
.event-cont .title{
  color: rgba(0,0,0,0.87);
  font-size: 20px;
  font-weight: 400;
  margin-left: 72px;
  margin-right: 260px;
  max-width: 770px;
  overflow: hidden;
  padding-top: 36px;
  padding-bottom: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item:hover .title{
  margin-left: 96px;
}
.list-item .followers{
  position: absolute;
  right: 136px;
  top: 50%;
  height: 32px;
  margin: -20px 0;
  text-align: center;
}
.list-item .followers .label{
  color: #bdbdbd;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  margin: 0;
  margin-top: 5px;
}
.list-item .img-wrap{
  height: 96px;
  position: absolute;
  right: 0;
  top: 0;
}
.event-img{
  height: 96px;
  width: 96px;
}
.sys-status{
  position: absolute;
  top: 21px;
  height: 42px;
  margin: -30px -10px;
  padding: 10px;
  right: 36px;
}
@-webkit-keyframes rotate{
from{-webkit-transform:rotate(0deg)}
to{-webkit-transform:rotate(360deg)}
}
@-moz-keyframes rotate{
from{-moz-transform:rotate(0deg)}
to{-moz-transform:rotate(360deg)}
}
@-ms-keyframes rotate{
from{-ms-transform:rotate(0deg)}
to{-ms-transform:rotate(360deg)}
}
@-o-keyframes rotate{
from{-o-transform:rotate(0deg)}
to{-o-transform:rotate(360deg)}
}
.sys-status span.normal{
  animation: 1.5s linear 0s normal none infinite rotate;
  -webkit-animation:1.5s linear 0s normal none infinite rotate;
}
a.event-cont{
  color: rgb(66, 132, 243);
}
div.event-img-label{
  background: linear-gradient(to top,rgba(0,0,0,0.54) 40%,rgba(0,0,0,0));
  bottom: 0;
  color: white;
  font-size: 10px;
  height: 24px;
  overflow: hidden;
  padding: 7px 6px;
  position: absolute;
  right: 0;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  width: 96px;
  white-space: nowrap;
  border-bottom: 1px solid #e0e0e0;
}
</style>
