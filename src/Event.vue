<template>
<div class="header">
  <div class="nav-wrap" id='spe-event-nav'>
    <nav-comp></nav-comp>
    <nav-title>
      <h1 slot="title" class="event-title">{{eventKeyword}}</h1>
    </nav-title>
  </div>
</div>
<comp-content>
  <div slot="content">
  </div>
</comp-content>
</template>

<script>
import navComp from './components/Nav.vue'
import navTitle from './components/Title.vue'
import compContent from './components/Content.vue'

export default {
  data () {
    return {
      eventKeyword: '加利福尼亚州公路巡警局‬, ‪710號州際公路和710號加利福尼亞州州道‬, ‪高速公路‬, ‪加州高速及快速公路系统‬‬'
    }
  },
  components: {
    navComp,
    navTitle,
    compContent
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
