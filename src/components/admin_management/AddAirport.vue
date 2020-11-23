<template>
  <div>
    <template>
      <b-card title="添加机场" sub-title="Add Airport"></b-card>
      <b-card header="机场信息" class="info-content">
        <b-form>
          <b-form-group label="机场名:">
            <b-form-input
              type="text"
              v-model="name"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="地址:">
            <b-form-input type="text" v-model="address"></b-form-input>
          </b-form-group>
          <b-form-group label="联系电话:">
            <b-form-input type="text" v-model="telephone"></b-form-input>
          </b-form-group>
          <b-button variant="primary" @click="submit_info()">添加</b-button>
        </b-form>
      </b-card>
    </template>
    <!-- 返回填写订票信息界面 -->
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
  name: "AddAirport",
  props: ["alerter"],
  data: function () {
    return {
      name: "",
      address: "",
      telephone: ""
    };
  },
  methods: {
    submit_info: function () {
      this.$axios({
        url: this.serverURL + "admin/add_airport",
        method: "post",
        withCredentials: true,
        data: {
          name: this.name,
          address: this.address,
          telephone: this.telephone,
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          this.alerter("成功", "机场添加成功");
        } else {
          this.alerter("错误", "相同机场已存在");
        }
      });
    },
    gomenu: function () {
      this.$router.push("/admin_management");
    },
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