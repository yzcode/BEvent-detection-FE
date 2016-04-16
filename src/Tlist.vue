<template>
<div class="header">
  <div class="nav-wrap">
    <nav-comp></nav-comp>
    <nav-title>
      <h1 slot="title" class="title-content">突发事件检测系统</h1>
    </nav-title>
  </div>
</div>
<comp-content>
  <div slot="content">
    <!-- <comp-elist data-url="/get_detection_events_by_time/" title='实时突发事件' :tip-word='sysStatus' rate-label='实时热点指数'></comp-elist> -->
    <comp-elist data-url="/get_tracking_events_by_time/" title='持续追踪事件' :tip-word='sysStatus' rate-label='整体热点指数'></comp-elist>
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
      msg: 'Hello from vue-loader!',
      sysStatus: '系统状态：正常'
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
</style>
