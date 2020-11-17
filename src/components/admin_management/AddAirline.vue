<template>
  <div>
    <template>
      <b-card title="添加航班" sub-title="Add Airline"></b-card>
      <b-card header="航班信息" class="info-content">
        <b-form>
          <b-form-group label="所属公司:">
            <b-form-select
              type="number"
              v-model="a_c_id"
              :options="idoptions"
            ></b-form-select>
          </b-form-group>
          <b-form-group label="出发城市:">
            <b-form-select
              v-model="start"
              :options="cityoptions"
            ></b-form-select>
          </b-form-group>
          <b-form-group label="抵达城市:">
            <b-form-select
              v-model="destination"
              :options="cityoptions"
            ></b-form-select>
          </b-form-group>
          <b-form-group label="飞机型号:">
            <b-form-input type="text" v-model="air_model"></b-form-input>
          </b-form-group>
          <b-form-group label="航班号:">
            <b-form-input type="text" v-model="flight_num"></b-form-input>
          </b-form-group>
          <b-form-group label="出发时间:">
            <b-form-timepicker
              v-model="start_time"
              now-button
              reset-button
              reset-value="8:00"
              :hide-header="hideHeader"
            ></b-form-timepicker>
          </b-form-group>
          <b-form-group label="到达时间:">
            <b-form-timepicker
              v-model="arrive_time"
              now-button
              reset-button
              reset-value="14:00"
              :hide-header="hideHeader"
            ></b-form-timepicker>
          </b-form-group>
          <b-form-group label="经济舱座位数:">
            <b-form-input type="number" v-model="eco"></b-form-input>
          </b-form-group>
          <b-form-group label="头等舱座位数:">
            <b-form-input type="number" v-model="fir"></b-form-input>
          </b-form-group>
          <b-form-group label="里程:">
            <b-form-input type="number" v-model="mileage"></b-form-input>
          </b-form-group>
          <b-form-group label="标准价格:">
            <b-form-input type="number" v-model="standard_price"></b-form-input>
          </b-form-group>
          <b-button variant="primary" @click="submit_info()">确认</b-button>
          <b-button variant="danger" href="#/airline_management">返回</b-button>
        </b-form>
      </b-card>
    </template>
  </div>
</template>

<script>
export default {
  name: "AddAirline",
  props: ["alerter"],
  data: function () {
    // const now = new Date();
    // const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // const minDate = new Date(today);
    // minDate.setMonth(minDate.getMonth());
    // minDate.setDate(minDate.getDate());
    // const maxDate = new Date(today);
    // maxDate.setMonth(maxDate.getMonth() + 2);
    // maxDate.setDate(15);
    return {
      a_c_id: "",
      start: "",
      destination: "",
      air_model: "",
      flight_num: "",
      start_time: "08:00",
      arrive_time: "14:00",
      eco: "",
      fir: "",
      mileage: "",
      standard_price: "",
      hideHeader: true,
      hour: false,
      cityoptions: [
        { value: "SHA", text: "上海", disabled: false },
        { value: "GUA", text: "广州", disabled: false },
        { value: "BEI", text: "北京", disabled: false },
      ],
      idoptions: [
        { value: "1", text: "北京航空", disabled: false },
        { value: "2", text: "九元航空", disabled: false },
        { value: "3", text: "上海航空", disabled: false },
      ],
    };
  },
  methods: {
    submit_info: function () {
      this.$axios({
        url: this.serverURL + "admin/add_airline",
        method: "post",
        data: {
          a_c_id: this.a_c_id,
          start: this.start,
          destination: this.destination,
          air_model: this.air_model,
          flight_num: this.flight_num,
          start_time: this.start_time,
          arrive_time: this.arrive_time,
          eco: this.eco,
          fir: this.fir,
          mileage: this.mileage,
          standard_price: this.standard_price,
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          this.alerter("成功", "航班添加成功");
          this.init_info();
        } else {
          this.alerter("错误", "相同的航班已存在");
        }
      });
    },
  },
};
</script>

<style scoped>
.info-content {
  width: 100%;
}
</style>