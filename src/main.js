/**
 * Created by yangz on 2016/1/17.
 */
import Vue from 'vue'
import App from './App.vue'
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
  '/Event/:eventId': {
    name: 'event',
    component: Event
  }
})

router.start(AppEnter, 'body')
