<template>
  <div>
    <template>
      <b-card title="个人信息管理" sub-title="Passenger Information"></b-card>
      <b-card header="我的信息" class="info-content">
        <b-form>
          <b-form-group
            label="用户名:"
            disabled
            description="登录时确定的唯一用户名，不可修改"
          >
            <b-form-input
              type="text"
              v-model="username"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="密码:">
            <b-form-input
              type="password"
              v-model="password"
              @focus="pass_focus()"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="姓名:">
            <b-form-input type="text" v-model="name"></b-form-input>
          </b-form-group>
          <b-form-group label="会员类型:">
            <b-form-input type="text" v-model="type"></b-form-input>
          </b-form-group>
          <b-form-group label="里程积分:">
            <b-form-input type="text" v-model="mile_score"></b-form-input>
          </b-form-group>
          <b-button variant="primary" @click="submit_info()">修改</b-button>
        </b-form>
      </b-card>
    </template>
    <b-breadcrumb-item @click="gomenu" class="back">
      <b-icon
        icon="house-fill"
        scale="1.25"
        shift-v="1.25"
        aria-hidden="true"
      ></b-icon>
      Home
    </b-breadcrumb-item>
  </div>
</template>

<script>
export default {
  name: "PassengerInform",
  props: ["alerter"],
  data: function () {
    return {
      username: "",
      password: "do_not_change",
      pass_first_select: true,
      name: "",
      type: "",
      mile_score: "",
    };
  },
  methods: {
    pass_focus: function () {
      if (this.pass_first_select) {
        this.password = "";
        this.pass_first_select = false;
      }
    },
    init_info: function () {
      this.$axios({
        url: this.serverURL + "passenger/get_passenger_info",
        method: "post",
        withCredentials: true,
        data: {
          username: this.$cookies.get("username")
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          this.username = data.u_info.username;
          this.name = data.u_info.name;
        } else {
          console.log(this);
          this.alerter("错误", data.info);
        }
      });
    },
    gomenu: function () {
      this.$router.push("/passenger_management");
    },
  },
  created: function () {
        this.init_info();
  },
};
</script>

<style scoped>
.info-content {
  width: 100%;
}
.back {
  height: 50px;
  width: 7%;
  right: 0px;
  top: 0px;
  position: absolute;
  color: #b8dadfda;
}
</style>