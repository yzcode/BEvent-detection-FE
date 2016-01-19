<template>
<content-frame spe-name="event-list">
  <div slot="title">
    突发事件
    <span class="sys-status" >
      系统状态: 正常
      <span class="fa fa-refresh"></span>
    </span>
  </div>
  <div slot="content">
    <div v-for="item in items" class="list-item">
      <div class="event-wrap">
        <a class="event-cont">
          <div class="index"></div>
          <div class="title">
            <span>{{item.title}}</span>
          </div>
          <div class="followers">
            <span>{{item.notice}}</span>
            <div class="label">过去24小时内关注人数</div>
          </div>
          <div class="img-wrap">
            <img class="event-img" src="/dist/assets/img/people.jpg">
          </div>
        </a>
      </div>
    </div>
  </div>
</content-frame>
</template>

<script>
import contentFrame from './Content-frame.vue'
export default {
  data () {
    return {
      items: [
        {
          title: '美国打过来了',
          notice: 1999
        },
        {
          title: '朝鲜打过来了',
          notice: 2999
        },
        {
          title: '英国国打过来了',
          notice: 3999
        },
        {
          title: '伊拉克打过来了',
          notice: 4999
        },
        {
          title: '利比亚打过来了',
          notice: 5999
        },
        {
          title: '伊朗打过来了',
          notice: 6999
        },
        {
          title: '韩国打过来了',
          notice: 7999
        },
        {
          title: '中国打过来了',
          notice: 8999
        },
        {
          title: '法国打过来了',
          notice: 9999
        },
        {
          title: '加拿大打过来了',
          notice: 10999
        }
      ]
    }
  },
  components: {
    contentFrame
  }
}
</script>

<style scoped>
.event-list-container .list-item{
  background: white;
  display: block;
  padding-left: 24px;
  position: relative;
  height: 96px;
}
.event-list-container .list-item:hover{
  padding-left: 0px;
  cursor: pointer;
}
.event-cont{
  display: block;
  min-height: 96px;
  position: relative;
  text-decoration: none;
  counter-increment: storyIndex;
  border-bottom: 1px solid #e0e0e0;
}
.list-item:hover .event-cont{
  background-color: #fafafa;
}
.event-cont .index:before{
  content: counter(storyIndex);
  color: rgba(0,0,0,0.87);
  font-size: 20px;
  position: absolute;
  top: 36px;
}
.list-item:hover .index{
  padding-left: 24px;
}
.event-cont .title{
  color: rgba(0,0,0,0.87);
  font-size: 20px;
  font-weight: 400;
  margin-left: 72px;
  margin-right: 260px;
  max-width: 770px;
  overflow: hidden;
  padding-top: 36px;
  padding-bottom: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item:hover .title{
  margin-left: 96px;
}
.list-item .followers{
  position: absolute;
  right: 136px;
  top: 50%;
  height: 32px;
  margin: -20px 0;
  text-align: center;
}
.list-item .followers .label{
  color: #bdbdbd;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  margin: 0;
  margin-top: 5px;
}
.list-item .img-wrap{
  height: 96px;
  position: absolute;
  right: 0;
  top: 0;
}
.event-img{
  height: 96px;
  width: 96px;
}
.sys-status{
  position: absolute;
  top: 21px;
  height: 42px;
  margin: -30px -10px;
  padding: 10px;
  right: 36px;
}
@-webkit-keyframes rotate{
from{-webkit-transform:rotate(0deg)}
to{-webkit-transform:rotate(360deg)}
}
@-moz-keyframes rotate{
from{-moz-transform:rotate(0deg)}
to{-moz-transform:rotate(360deg)}
}
@-ms-keyframes rotate{
from{-ms-transform:rotate(0deg)}
to{-ms-transform:rotate(360deg)}
}
@-o-keyframes rotate{
from{-o-transform:rotate(0deg)}
to{-o-transform:rotate(360deg)}
}
.sys-status span{
  animation: 1.5s linear 0s normal none infinite rotate;
  -webkit-animation:1.5s linear 0s normal none infinite rotate;
}
</style>
