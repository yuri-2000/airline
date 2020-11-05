<template>
  <div class="Admin">
    <b-title>欢迎使用航空订票系统</b-title>
    <template>
      <b-row class="my-1">
        <b-col sm="3">
          <label>用户名:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="Username"
            placeholder="Username"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="3">
          <label>密码:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            type="password"
            v-model="Password"
            placeholder="Password"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-button pill variant="outline-primary" href="#/passenger_management"
        >Logn in</b-button
      >
    </template>
  </div>
</template>

<script>
export default {
  methods: {}
}
</script>

<style scoped>
.Admin {
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin: 0px auto;
}
</style>