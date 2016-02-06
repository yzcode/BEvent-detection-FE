<template>
<content-frame spe-name="tweets">
  <div slot="title">
    {{title}}
  </div>
  <div slot="content">
    <div class="generic-content-container">
      <div class="carousel-wrapper">
        <div class="carousel-items">
          <div class="tweet-container" v-for="tweet in tweets">
            <a class="tweet tweet-item">
              <div class="tweet-content">
                <div class="tweet-text">
                  <span>{{tweet.content}}</span>
                </div>
                <div class="tweet-source-time">
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
    </div>
  </div>
</content-frame>
</template>

<script>
var $ = require('jquery')
var formulaSet = require('../services/formula')
import contentFrame from './Content-frame.vue'
export default {
  props: ['title'],
  data () {
    return {
      tweets: []
    }
  },
  events: {
    'tweet-ready-load': function (tweet_url) {
      $.get(tweet_url, (data, status) => {
        this.tweets = []
        for (var i in data) {
          data[i].comments = formulaSet.getRandom(1, 1000)
          data[i].forwards = formulaSet.getRandom(1, 1000)
          data[i].likes = formulaSet.getRandom(1, 1000)
          this.tweets.push(data[i])
        }
      })
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
  cursor: pointer;
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
  height: 16px;
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
</style>
