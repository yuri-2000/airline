<template>
  <div class="Admin">
    <b-title>欢迎使用航空订票系统</b-title>
    <template>
      <b-row class="my-1">
        <b-col sm="3">
          <label>用户名:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input v-model="username" placeholder="Username"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="3">
          <label>密码:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input type="password" v-model="password" placeholder="Password"></b-form-input>
        </b-col>
      </b-row>
      <!-- 注册按钮 -->
      <b-button pill variant="outline-primary" @click="register()">register</b-button>
      <!-- 登录按钮 -->
      <b-button pill variant="outline-primary" @click="login()">Login</b-button>
      <b-modal v-model="alertPop" title="登录失败"> 用户名或密码错误 </b-modal>
    </template>
    <div>
      <b-link href="#/admin_login" class="isadmin">我是管理员</b-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["alerter"],
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
          if (data.success) {
            this.$cookies.set("username", this.username);
            this.$router.push("/passenger_management");
          } else this.alertPop = true;
        });
      },
      register: function () {
        this.$axios({
          url: "http://127.0.0.1:5000/passenger/add_passenger",
          method: "post",
          data: {
            username: this.username,
            password: this.password,
          },
        }).then((res) => {
          let data = res.data;
          if (data.success) {
            this.$cookies.set("username", this.username);
            this.$router.push("/passenger_management");
          } else this.alerter("错误", "用户名已存在");
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
  .isadmin {
  height: 50px;
  width: 7%;
  right: 0px;
  top: 0px;
  position: absolute;
}
</style>