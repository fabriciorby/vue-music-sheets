<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Partitura/>
  </div>
</template>

<script>
import Partitura from './components/Partitura.vue'

export default {
  name: 'app',
  components: {
    Partitura
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
