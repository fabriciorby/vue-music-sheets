<template>
  <div id="app">
    <Principal/>
  </div>
</template>

<script>
import Principal from './components/Principal.vue'

export default {
  name: 'app',
  components: {
    Principal
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
