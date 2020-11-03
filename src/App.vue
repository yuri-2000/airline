<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App',
    beforeCreate: function(){
      document
      .querySelector("body")
      .setAttribute("style", "margin: 0; background-color: #c9f7f056");
    },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #c9f7f056;
  margin-top: 60px;
}
</style>
