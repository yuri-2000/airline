<template>
  <div class="Admin">
    <b-jumbotron>
      <template #header>Airline Reservation System</template>
      <hr />
      <br />
      <template #lead> This is a passenger login unit </template>
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
        <!-- 注册按钮 -->
        <b-button pill variant="warning" @click="register()">register</b-button>
        <!-- 登录按钮 -->
        <b-button pill variant="primary" @click="login()">Login</b-button>
        <b-modal v-model="alertPop" title="登录失败">
          用户名或密码错误
        </b-modal>
      </template>
      <div>
        <b-breadcrumb-item href="#/admin_login" class="isadmin">
          <b-icon
            icon="person-fill"
            scale="1.5"
            shift-v="1.25"
            aria-hidden="true"
          ></b-icon>
          Admin
        </b-breadcrumb-item>
      </div>
    </b-jumbotron>
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
          //id与admin公用问题
          this.$cookies.set("id", data.id);
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
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#e9ecef");
  },
  // beforeDestroy () {
  //   document.querySelector('body').setAttribute('style', "background:#fff")
  // }
};
</script>

<style scoped>
.Admin {
  width: 100vw;
  height: 100vh;
  text-align: center;
  margin: 70px auto;
  color: #000;
}
.isadmin {
  height: 50px;
  width: 7%;
  right: 0px;
  top: 0px;
  position: absolute;
}
</style>