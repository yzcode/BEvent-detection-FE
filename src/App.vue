<template lang="jade">
nav-comp
</template>

<script>
import navComp from './components/Nav.vue'

export default {
  data () {
    return {
      msg: 'Hello from vue-loader!'
    }
  },
  components: {
    navComp
  }
}
</script>

<style lang="stylus">
font-stack = Helvetica, sans-serif
primary-color = #EEE
body
  font 100% font-stack
  background-color primary-color

</style>
