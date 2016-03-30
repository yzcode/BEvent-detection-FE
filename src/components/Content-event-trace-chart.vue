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
// var formulaSet = require('../services/formula')
import contentFrame from './Content-frame.vue'
var echarts = require('echarts')
// test content
var keyword = ['南京 宝马 警方', '南京 宝马 肇事', '南京 宝马 嫌疑人', '南京 宝马 超速', '南京 宝马 驾驶证', '南京 宝马 死亡', '南京 宝马 事故', '南京 宝马', '南京 宝马 无照驾驶', '南京 宝马', '南京 宝马', '南京 宝马 毒驾']
var option = {
  tooltip: {
    trigger: 'axis',
    formatter: function (params, ticket, callback) {
      var tip_str = '事件编号: ' + params[0].name + '<br/>'
      tip_str += '事件时间: ' + '<br/>'
      for (var i in params) {
        tip_str += params[i].seriesName + ': ' + params[i].value + '<br/>'
      }
      tip_str += '关键词' + ': ' + keyword[params[0].dataIndex] + '<br/>'
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
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '情感指数',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value}'
      }
    },
    {
      type: 'value',
      name: '热度指数',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: '负面情感指数',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    {
      name: '正面情感指数',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: '热度指数',
      type: 'line',
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
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
      var eventArr = []
      for (var i in eventData) {
        eventData[i].timestamp = new Date(eventData[i].timestamp)
        eventArr.push(eventData[i])
      }
      eventArr.sort((a, b) => {
        return b.timestamp.valueOf() - a.timestamp.valueOf()
      })
      for (var ei = 0; ei < eventArr.length; ei++) {
        console.log(eventArr[ei].timestamp)
      }
    }
  },
  ready () {
    var myChart = echarts.init(document.getElementById('chart-trace'))
    myChart.setOption(option)
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
