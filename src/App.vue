<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir;
  /* Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

</style>
