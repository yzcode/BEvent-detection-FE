x<template>
<content-frame spe-name='dist-chart'>
  <div slot='title'>
  {{title}}
  </div>
  <div slot='content'>
    <div id='chart-dist'></div>
  </div>
</content-frame>
</template>

<script>
var $ = require('jquery')
// var formulaSet = require('../services/formula')
var coordinateSet = require('../services/coordinate')
import contentFrame from './Content-frame.vue'
var echarts = require('echarts')
// test content
var data = [
]
var geoCoordMap = coordinateSet.cityCoordinate

var convertData = function (data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  // console.log(data)
  return res
}

var option = {
  title: {
    text: '全国微博分布图',
    subtext: '中国大陆地区',
    left: 'center',
    textStyle: {
      color: '#3C485C'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: (params, ticket, callback) => {
      var tip_str = params.seriesName + '<br/>'
      tip_str += '<span style="display: inline-block;margin-right: 5px;border-radius: 10px;width: 9px;height: 9px;background-color:' + params.color + '"></span>'
      tip_str += params.name
      tip_str += params.data.value[2]
      return tip_str
    }
  },
  legend: {
    orient: 'vertical',
    y: 'bottom',
    x: 'right',
    data: ['微博数量'],
    textStyle: {
      color: '#3C485C'
    }
  },
  geo: {
    map: 'china',
    label: {
      emphasis: {
        show: false
      }
    },
    roam: true,
    itemStyle: {
      normal: {
        areaColor: '#4285F4',
        borderColor: '#FFF'
      },
      emphasis: {
        areaColor: '#62A5F4'
      }
    }
  },
  series: [
    {
      name: '微博数量',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: convertData(data),
      symbolSize: function (val) {
        return val[2] * 1.5
      },
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#ddb926'
        }
      }
    },
    {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: convertData(data.sort(function (a, b) {
        return b.value - a.value
      }).slice(0, 6)),
      symbolSize: function (val) {
        return val[2] * 1.2
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
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
    'dist-ready-load': (tweetdata) => {
      $.get('/dist/assets/json/china.json', function (chinaJson) {
        echarts.registerMap('china', chinaJson)
        var statics = {}
        if (typeof tweetdata === 'string') {
          tweetdata = JSON.parse(tweetdata)
        }
        for (var i in tweetdata) {
          if (typeof tweetdata[i] === 'string') {
            tweetdata[i] = JSON.parse(tweetdata[i])
          }
          var locations = tweetdata[i].location.split(' ')
          var prelocation = ''
          if (locations[1] && geoCoordMap[locations[1]]) {
            prelocation = locations[1]
          } else if (locations[1] && geoCoordMap[locations[1] + '市']) {
            prelocation = locations[1] + '市'
          } else if (geoCoordMap[locations[0]]) {
            prelocation = locations[0]
          } else if (geoCoordMap[locations[0] + '市']) {
            prelocation = locations[0] + '市'
          } else {
            if (locations[0] !== '其他') {
              // console.log(locations)
            }
          }
          if (prelocation !== '') {
            if (!statics[prelocation]) {
              statics[prelocation] = 0
            }
            statics[prelocation] ++
          }
        }
        data = []
        for (var k in statics) {
          data.push({
            name: k,
            value: statics[k]
          })
          // console.log(k)
        }
        option.series[0].data = convertData(data)
        option.series[1].data = convertData(data.sort(function (a, b) {
          return b.value - a.value
        }).slice(0, 6))
        // console.log(data)
        var myChart = echarts.init(document.getElementById('chart-dist'))
        setTimeout(() => {myChart.setOption(option)}, 1500)
      })
      console.log('dist-char-load')
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
#chart-dist{
  height: 500px;
  width: 100%;
}
</style>
