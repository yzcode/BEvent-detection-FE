<template >
<div class="content-wrap">
  <slot name="content">
  </slot>
</div>
</template>

<script>
import compElist from './Content-elist.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    compElist
  }
}
</script>

<style scoped>
div.content-wrap{
  max-width: 1152px;
  margin: 0 auto;
}
</style>
