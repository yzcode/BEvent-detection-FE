<template>
<div class="{{speName}}-wrap spe-content-wrap">
  <div class="{{speName}}-container spe-content-container">
    <div class="generic-separator {{speName}}-header spe-content-header">
      <div class="title">
        <slot name="title"></slot>
      </div>
    </div>
    <slot name="content"></slot>
  </div>
</div>
</template>

<script>
export default {
  props: ['speName'],
  data () {
    return {
      items: [
      ]
    }
  },
  components: {

  }
}
</script>

<style scoped>
.spe-content-wrap{
  color: rgba(0,0,0,0.87);
  margin-bottom: 60px;
}
.spe-content-container{
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.12);
  font-family: 'Roboto',Arial,sans-serif;
  font-weight: 400;
  max-width: 1152px;
  text-align: inherit;
  counter-reset: storyIndex;
  margin-bottom: 0;
  overflow: hidden;
}
.spe-content-header{
  color: rgba(0,0,0,0.54);
  height: 47px;
  line-height: 47px;
  padding-left: 24px;
  padding-right: 24px;
  position: relative;
  z-index: 1;
}
.spe-content-header .title{
  padding-right: 40px;
  font-size: 16px;
  color: rgba(0,0,0,0.87);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spe-content-header .title{
  color: rgba(0,0,0,0.87);
  font-size: 20px;
  font-weight: 400;
  margin-right: 260px;
  max-width: 770px;
  overflow: hidden;
  padding-bottom: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
