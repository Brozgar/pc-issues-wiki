<template>
  <div id="app">
    <IssueDetector/>
  </div>
</template>

<script>
import IssueDetector from './components/IssueSearch';

export default {
  name: 'App',
  components: {
    IssueDetector,
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
