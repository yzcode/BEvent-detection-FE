<template>
<content-frame spe-name="tweets">
  <div slot="title">
    {{title}}
  </div>
  <div slot="content">
    <div class="generic-content-container" id="carouse_contaner">
      <div class="carousel">
        <div class="carousel-wrapper">
          <div class="carousel-items">
            <div class="tweet-container" v-for="tweet in tweets">
              <a class="tweet tweet-item">
                <div class="tweet-content">
                  <div class="tweet-text">
                    <span>{{tweet.content}}</span>
                  </div>
                  <div class="tweet-source-time">
                    <div class="tweet-source" url="{{tweet.pageurl}}">
                      <span @click="tweetRawPage(tweet.pageurl)">原文链接</span>
                    </div>
                    <div class="tweet-user"><span>{{tweet.username}}</span></div>
                    <div class="tweet-time">{{tweet.timestamp}}</div>
                  </div>
                </div>
                <div class="tweet-media">
                  <div class="tweet-comment-cnt">评论：<span>{{tweet.comments}}</span></div>
                  <div class="tweet-forward-cnt">转发：<span>{{tweet.forwards}}</span></div>
                  <div class="tweet-like-cnt">点赞：<span>{{tweet.likes}}</span></div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="left-roll-btn roll-btn carousel-hiden" @click="rollRight">
          <div class="svg-wraper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="ng-scope">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </div>
        </div>
        <div class="right-roll-btn roll-btn carousel-hiden" @click="rollLeft">
          <div class="svg-wraper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="ng-scope">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</content-frame>
</template>

<script>
var $ = require('jquery')
// var globalConfig = require('../services/globalConfig')
var formulaSet = require('../services/formula')
import contentFrame from './Content-frame.vue'
var carouselCtl = {
  carouselMax: 0,
  carouselIndex: 0,
  initItem: function () {
    this.carouselMax = 0
    this.carouselIndex = 0
    $('.carousel-items').css('left', '0')
  },
  addItem: function () {
    this.carouselMax++
    if (this.carouselIndex + 3 < this.carouselMax) {
      $('.carousel .right-roll-btn').removeClass('carousel-hiden')
    } else {
      $('.carousel .right-roll-btn').addClass('carousel-hiden')
    }
  },
  incIndex: function () {
    if (this.carouselIndex + 3 < this.carouselMax) {
      this.carouselIndex ++
      $('.carousel-items').animate({
        'left': '-=384px'
      }, 'fast')
      $('.carousel .left-roll-btn').removeClass('carousel-hiden')
      if (this.carouselIndex + 3 === this.carouselMax) {
        $('.carousel .right-roll-btn').addClass('carousel-hiden')
      }
    }
  },
  decIndex: function () {
    if (this.carouselIndex > 0) {
      this.carouselIndex --
      $('.carousel-items').animate({
        'left': '+=384px'
      }, 'fast')
      $('.carousel .right-roll-btn').removeClass('carousel-hiden')
      if (this.carouselIndex === 0) {
        $('.carousel .left-roll-btn').addClass('carousel-hiden')
      }
    }
  }
}
export default {
  props: ['title'],
  data () {
    return {
      tweets: []
    }
  },
  events: {
    'tweet-ready-load': function (data) {
      carouselCtl.initItem()
      this.tweets = []
      if (typeof data === 'string') {
        data = JSON.parse(data)
      }
      for (var i in data) {
        if (typeof data[i] === 'string') {
          data[i] = JSON.parse(data[i])
        }
        data[i].comments = formulaSet.getRandom(1, 100)
        data[i].forwards = formulaSet.getRandom(1, 100)
        data[i].likes = formulaSet.getRandom(1, 100)
        this.tweets.push(data[i])
        carouselCtl.addItem()
      }
      setInterval(() => {
        this.rollLeft()
      }, 2500)
    }
  },
  methods: {
    'tweetRawPage': (msg, event) => {
      window.open(msg)
    },
    'rollLeft': (event) => {
      carouselCtl.incIndex()
    },
    'rollRight': (event) => {
      carouselCtl.decIndex()
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
.tweet-container{
  display: inline-block;
  vertical-align: top;
}
.tweet{
  border-right: 1px solid #e0e0e0;
  /*cursor: pointer;*/
  display: inline-block;
  padding: 24px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 384px;
}
.tweet-content{
  display: inline-block;
  height: 96px;
  margin-right: 31px;
  position: relative;
  width: 208px;
}
.tweet-text{
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color: #3367d6;
  display: -webkit-box;
  font-size: 15px;
  height: 60px;
  line-height: 20px;
  width: 208px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
.tweet-source-time{
  color: rgba(0,0,0,0.54);
  font-size: 12px;
  font-weight: 500;
  height: 30px;
  margin-top: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 208px;
}
.tweet-user, .tweet-time{
  display: inline-block;
}
.tweet-media{
  display: inline-block;
  height: 96px;
  position: absolute;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.541176);
}
.tweet-media > div{
  margin-bottom: 10px;
}
.tweet-media>div>span{
  color: red;
}
.tweet-source-time > .tweet-source span{
  color: #84ABF0;
  cursor: pointer;
}
.roll-btn{
  display: none;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.12);
  cursor: pointer;
  height: 40px;
  margin: -20px 0;
  position: absolute;
  outline: 0;
  top: 50%;
  width: 40px;
  z-index: 2;
}
.carousel:hover .roll-btn{
  display: block;
}
.left-roll-btn{
  left: -20px;
}
.right-roll-btn{
  right: -20px;
}
.left-roll-btn:hover{
  background-color: #fafafa!important;
}
.roll-btn .svg-wraper{
  color: #000;
  display: block;
  height: 24px;
  width: 24px;
  margin: 8px auto 0;
}
</style>
