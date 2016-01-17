<template lang="jade">
div.navbar
  span.nav-menu-bar.fa.fa-bars
  span.nav-title {{msg}}
</template>

<script>
export default {
  data () {
    return {
      msg: 'Brust Event Detection System DOME'
    }
  }
}
</script>

<style scoped>
div.navbar{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 8px 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.28);
  background-color: rgb(66,133,244);
  color: white;
}
span.nav-title{
  margin: .67em 0.67em;
  padding: 100px 10px;
  font-family: 'Roboto',Arial,sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #EEE;
}
span.nav-menu-bar{
}
</style>
