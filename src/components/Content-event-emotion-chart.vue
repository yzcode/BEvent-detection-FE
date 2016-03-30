<template>
<content-frame spe-name='emotion-chart'>
  <div slot='title'>
    {{title}}
  </div>
  <div slot='content'>
    <div id='chart-emotion-bar'></div>
    <div id='chart-emotion-pie'></div>
  </div>
</content-frame>
</template>

<script>
// var $ = require('jquery')
// var formulaSet = require('../services/formula')
import contentFrame from './Content-frame.vue'
import { preEventFilter } from '../services/preEventFilter'
var echarts = require('echarts')
// test content
var baroption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['正面指数', '负面指数', '中性指数'],
    top: '5%'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '2%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value'
    }
  ],
  yAxis: [
    {
      type: 'category',
      data: []
    }
  ],
  series: [
    {
      name: '正面指数',
      type: 'bar',
      stack: '总量',
      itemStyle: {
        normal: {
          label: {
            show: false,
            position: 'insideRight',
            formatter: (params) => {
              if (params.data - 0.01 < 0) {
                return ''
              }
              return params.data.toFixed(2)
            }
          }
        }
      },
      data: []
    },
    {
      name: '负面指数',
      type: 'bar',
      stack: '总量',
      itemStyle: {
        normal: {
          label: {
            show: false,
            position: 'insideRight',
            formatter: (params) => {
              if (params.data - 0.01 < 0) {
                return ''
              }
              return params.data.toFixed(2)
            }
          }
        }
      },
      data: []
    },
    {
      name: '中性指数',
      type: 'bar',
      stack: '总量',
      itemStyle: {
        normal: {
          label: {
            show: false,
            position: 'insideRight',
            formatter: (params) => {
              if (params.data - 0.01 < 0) {
                return ''
              }
              return params.data.toFixed(2)
            }
          }
        }
      },
      data: []
    }
  ]
}
var pieoption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'horizontal',
    bottom: '3px',
    data: ['强正面', '弱正面', '中性', '弱负面', '强负面']
  },
  series: [
    {
      name: '情感状态',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
      ]
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
    'emotionbar-ready-load': (eventData) => {
      var eventArr = []
      preEventFilter(eventData)
      for (var i in eventData) {
        eventData[i].timestamp = new Date(eventData[i].timestamp)
        eventArr.push(eventData[i])
      }
      eventArr = eventArr.sort((a, b) => {
        return b.timestamp.valueOf() - a.timestamp.valueOf()
      }).slice(0, 7).reverse()
      baroption.yAxis[0].data = []
      baroption.series[0].data = []
      baroption.series[1].data = []
      baroption.series[2].data = []
      baroption.yAxis[0].data.push('当前事件')
      for (var ei = 0; ei < eventArr.length; ei++) {
        if (ei !== 0) baroption.yAxis[0].data.push('事件' + (ei))
        baroption.series[0].data.push(eventArr[ei].sentiment_pos.toFixed(2))
        baroption.series[1].data.push(eventArr[ei].sentiment_neg.toFixed(2))
        baroption.series[2].data.push((eventArr[ei].sentiment_neu / 15).toFixed(2))
      }
      var barChart = echarts.init(document.getElementById('chart-emotion-bar'))
      setTimeout(() => {
        barChart.setOption(baroption)
      }, 800)
    },
    'emotionpie-ready-load': function (data) {
      if (typeof data === 'string') {
        data = JSON.parse(data)
      }
      var statics = {
        '强正面': 0,
        '弱正面': 0,
        '中性': 0,
        '弱负面': 0,
        '强负面': 0
      }
      for (var i in data) {
        if (typeof data[i] === 'string') {
          data[i] = JSON.parse(data[i])
        }
        var pos = data[i].pos
        var neg = data[i].neg
        var neu = data[i].neu
        if (pos > neg && pos > neu) {
          if (pos > 0.75) {
            statics['强正面']++
          } else {
            statics['弱正面']++
          }
        } else if (neg > pos && neg > neu) {
          if (neg > 0.75) {
            statics['强负面']++
          } else {
            statics['弱负面']++
          }
        } else {
          statics['中性']++
        }
      }
      pieoption.series[0].data = []
      for (var j in statics) {
        pieoption.series[0].data.push({value: statics[j], name: j})
      }
      var pieChart = echarts.init(document.getElementById('chart-emotion-pie'))
      pieChart.setOption(pieoption)
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
#chart-emotion-bar{
  height: 250px;
  width: 100%;
}
#chart-emotion-pie{
  height: 250px;
  width: 100%;
}
</style>
