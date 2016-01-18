<template lang="jade">
div.content-wrap
  comp-elist
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
