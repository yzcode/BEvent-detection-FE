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
    data: ['强负面', '弱负面', '中性', '弱正面', '强正面']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
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
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  ],
  series: [
    {
      name: '强负面',
      type: 'bar',
      stack: '总量',
      itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: '弱负面',
      type: 'bar',
      stack: '总量',
      itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
      data: [220, 232, 201, 234, 190, 330, 310]
    },
    {
      name: '中性',
      type: 'bar',
      stack: '总量',
      itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '弱正面',
      type: 'bar',
      stack: '总量',
      itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: '强正面',
      type: 'bar',
      stack: '总量',
      itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
      data: [320, 332, 301, 434, 590, 530, 420]
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
    data: ['强负面', '弱负面', '中性', '弱正面', '强正面']
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
        if (pos > neg && pos > neu && pos > 0.5) {
          if (pos > 0.8) {
            statics['强正面']++
          } else {
            statics['弱正面']++
          }
        } else if (neg > pos && neg > neu && neg > 0.5) {
          if (neg > 0.8) {
            statics['强负面']++
          } else {
            statics['弱负面']++
          }
        } else {
          statics['中性']++
        }
      }
      for (var j in statics) {
        pieoption.series[0].data.push({value: statics[j], name: j})
      }
      var pieChart = echarts.init(document.getElementById('chart-emotion-pie'))
      pieChart.setOption(pieoption)
    }
  },
  ready () {
    var barChart = echarts.init(document.getElementById('chart-emotion-bar'))
    setTimeout(() => {
      barChart.setOption(baroption)
    }, 800)
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
