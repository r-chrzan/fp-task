<template>
  <div id="app" v-cloak>
    <FutureProcessingTask/>
  </div>
</template>

<script>
import FutureProcessingTask from './components/FutureProcessingTask'

export default {
  name: 'App',
  components: {
    FutureProcessingTask
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:900|Raleway&display=swap&subset=latin-ext');
#app {
font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #131313;
}
</style>
