<template lang="jade">
div.navbar
  h1 {{ msg }}
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello from vue-loader!'
    }
  }
}
</script>

<style lang="stylus">
bg-color #6685F4
div.navbar
  position fixed
  top 0
  background-color bg-color
</style>
