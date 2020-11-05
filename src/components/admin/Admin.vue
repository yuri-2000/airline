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
            v-model="username"
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
            v-model="password"
            placeholder="Password"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-button pill variant="outline-primary" href="#/passenger_management/AddPassenger"
        >register</b-button
      >
      <b-button pill variant="outline-primary" @click="login()"
        >Login</b-button
      >
      <b-modal v-model="alertPop" title="登录失败"> 用户名或密码错误 </b-modal>
    </template>
  </div>
</template>

<script>
export default {
  methods: {
    login: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/passenger/login",
        method: "post",
        data: {
          username: this.username,
          password: this.password,
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) this.$router.push("/passenger_management");
        else this.alertPop = true;
      });
    },
  },
  data: function () {
    return {
      password: "",
      username: "",
      alertPop: false,
    };
  },
};
</script>

<style scoped>
.Admin {
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin: 0px auto;
}
</style>