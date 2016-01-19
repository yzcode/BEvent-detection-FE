<template>
<div class="header">
  <div class="nav-wrap">
    <nav-comp></nav-comp>
    <nav-title>
      <h1 slot="title" class="event-title">{{msg}}</h1>
    </nav-title>
  </div>
</div>
<comp-content>
  <div slot="content">
    <comp-elist></comp-elist>
  </div>
</comp-content>
</template>

<script>
import navComp from './components/Nav.vue'
import navTitle from './components/Title.vue'
import compContent from './components/Content.vue'
import compElist from './components/Content-elist.vue'
export default {
  data () {
    return {
      msg: '加利福尼亚州公路巡警局‬, ‪710號州際公路和710號加利福尼亞州州道‬, ‪高速公路‬, ‪加州高速及快速公路系统‬‬'
    }
  },
  components: {
    navComp,
    navTitle,
    compContent,
    compElist
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
</style>
