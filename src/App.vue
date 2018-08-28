<template>
  <div id="app">
    <Login></Login>
    <!--<router-view/>-->
  </div>
</template>

<script>
  import Login from '@/views/login'
export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
  @import "styles/common.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
