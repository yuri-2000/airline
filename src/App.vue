<template>
  <div id="app">
    <router-view :alerter="alerter"></router-view>
    <b-modal :title="title" v-model="popout">
      {{ content }}
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "App",
  beforeCreate: function () {
    document
      .querySelector("body")
      .setAttribute("style", "margin: 0; background-color: #ffffff");
  },
  methods: {
    alerter: function (title, content) {
      this.title = title;
      this.content = content;
      this.popout = true;
    },
  },
  data: function () {
    return {
      title: "",
      content: "",
      popout: false,
    };
  },
};
</script>

<style>
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
