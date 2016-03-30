<template>
<content-frame spe-name='trace-chart'>
  <div slot='title'>
    {{title}}
  </div>
  <div slot='content'>
    <div id='chart-trace'></div>
  </div>
</content-frame>
</template>

<script>
// var $ = require('jquery')
var formulaSet = require('../services/formula')
import { preEventFilter } from '../services/preEventFilter'
import contentFrame from './Content-frame.vue'
var echarts = require('echarts')
// test content
var dataDisArr = []
var option = {
  tooltip: {
    trigger: 'axis',
    formatter: function (params, ticket, callback) {
      var tip_str = '事件编号: ' + params[0].name + '<br/>'
      tip_str += '事件时间: ' + dataDisArr[params[0].dataIndex].date.toLocaleString() + '<br/>'
      for (var i in params) {
        tip_str += params[i].seriesName + ': ' + params[i].value + '<br/>'
      }
      tip_str += '关键词' + ': ' + dataDisArr[params[0].dataIndex].keyword + '<br/>'
      return tip_str
    }
  },
  toolbox: {
    show: true,
    feature: {
      mark: {show: true},
      dataView: {show: true, readOnly: false},
      magicType: {show: true, type: ['line', 'bar']},
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  calculable: true,
  legend: {
    data: ['负面情感指数', '正面情感指数', '热度指数']
  },
  xAxis: [
    {
      type: 'category',
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '情感指数',
      axisLabel: {
        formatter: '{value}'
      }
    },
    {
      type: 'value',
      name: '热度指数',
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: '负面情感指数',
      type: 'bar',
      data: []
    },
    {
      name: '正面情感指数',
      type: 'bar',
      data: []
    },
    {
      name: '热度指数',
      type: 'line',
      yAxisIndex: 1,
      data: []
    }
  ]
}
// test content end
export default {
  props: ['title'],
  data () {
    return {
      traceData: []
    }
  },
  events: {
    'trace-ready-load': (eventData) => {
      // console.log(eventData)
      var eventArr = []
      dataDisArr = []
      preEventFilter(eventData)
      for (var i in eventData) {
        eventData[i].timestamp = new Date(eventData[i].timestamp)
        eventArr.push(eventData[i])
      }
      eventArr = eventArr.sort((a, b) => {
        return b.timestamp.valueOf() - a.timestamp.valueOf()
      }).slice(0, 12).reverse()
      option.series[0].data = []
      option.series[1].data = []
      option.series[2].data = []
      option.xAxis[0].data = []
      for (var ei = 0; ei < eventArr.length; ei++) {
        // console.log(eventArr[ei].timestamp)
        option.xAxis[0].data.push((ei + 1).toString())
        option.series[0].data.push(eventArr[ei].sentiment_neg.toFixed(6))
        option.series[1].data.push(eventArr[ei].sentiment_pos.toFixed(6))
        option.series[2].data.push(formulaSet.getHotRate(eventArr[ei].burst_tweets_count, eventArr[ei].sum_tweets_count))
        dataDisArr.push({
          date: eventArr[ei].timestamp,
          keyword: eventArr[ei].wordsStr
        })
      }
      var myChart = echarts.init(document.getElementById('chart-trace'))
      myChart.setOption(option)
    }
  },
  ready () {
  },

  components: {
    contentFrame
  }
}
</script>

<style scoped>
#chart-trace{
  height: 400px;
  width: 100%;
}
</style>
