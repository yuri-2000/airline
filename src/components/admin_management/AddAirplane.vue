<template>
  <div>
    <template>
      <b-card title="添加飞机" sub-title="Add Airplane"></b-card>
      <b-card header="飞机信息" class="info-content">
        <b-form>
          <b-form-group label="所属公司:">
            <b-form-input type="text" disabled v-model="id"></b-form-input>
          </b-form-group>
          <b-form-group label="飞机型号:">
            <b-form-select
              type="text"
              v-model="air_model"
              :options="modeloptions"
            ></b-form-select>
          </b-form-group>
          <b-form-group label="经济舱定额:">
            <b-form-spinbutton
              type="number"
              v-model="eco"
              min="30"
              max="100"
              step="10"
            ></b-form-spinbutton>
          </b-form-group>
          <b-form-group label="头等舱定额:">
            <b-form-spinbutton
              type="number"
              v-model="fir"
              min="30"
              max="100"
              step="10"
            ></b-form-spinbutton>
          </b-form-group>
          <b-button variant="primary" @click="submit_info()">修改</b-button>
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
      id: this.$cookies.get("id"),
      eco: 30,
      fir: 30,
      air_model: "",
      modeloptions: [
        { value: "空客330", text: "空客330", disabled: false },
        { value: "波音747", text: "波音747", disabled: false },
        { value: "波音777", text: "波音777", disabled: false },
      ],
    };
  },
  methods: {
    submit_info: function () {
      this.$axios({
        url: this.serverURL + "admin/add_airplane",
        method: "post",
        withCredentials: true,
        data: {
          id: this.id,
          air_model: this.air_model,
          eco: this.eco,
          fir: this.fir,
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          this.alerter("成功", "飞机添加成功");
        } else {
          this.alerter("错误", data.info);
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