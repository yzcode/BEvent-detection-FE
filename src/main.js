/**
 * Created by yangz on 2016/1/17.
 */
import Vue from 'vue'
import App from './App.vue'
import Trace from './Trace.vue'
import Tlist from './Tlist.vue'
import Event from './Event.vue'
var VueRouter = require('vue-router')
Vue.use(VueRouter)

var router = new VueRouter()
/* eslint-disable no-new */
var AppEnter = Vue.extend({})

router.map({
  '/': {
    component: App
  },
  '/Event/:event_id': {
    name: 'event',
    component: Event
  },
  '/TraceEvent/:Trace_id': {
    name: 'traceevent',
    component: Trace
  },
  '/TraceList': {
    name: 'tracelist',
    component: Tlist
  }
})

router.beforeEach(() => {
  window.scrollTo(0, 0)
})

router.start(AppEnter, 'body')
