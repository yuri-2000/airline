<template>
  <div class="card">
    <template>
      <b-card
        title="添加航线"
        sub-title="Add Airline"
        class="card_body"
      ></b-card>
      <b-card header="航线信息" class="info-content">
        <b-form>
          <b-form-group label="所属公司:" disabled>
            <b-form-input type="text" v-model="a_c_name"></b-form-input>
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
          <b-form-group label="飞机型号:" disabled>
            <b-form-input
              type="text"
              v-model="air_model"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="航班号:">
            <b-form-input type="text" v-model="flight_num"></b-form-input>
            <b-button variant="warning" v-b-toggle.my-collapse>显示航班</b-button>
            <!-- Top of collapse -->
            <b-collapse id="my-collapse">
              <b-table
                sticky-header="600px"
                head-variant="dark"
                striped
                hover
                :items="items"
                :fields="fields"
                selectable
                @row-selected="onRowSelected"
                responsive="sm"
                :select-mode="selectMode"
                primary-key="id"
                :tbody-transition-props="transProps"
                class="flip-list-move"
                ><template #cell(selected)="{ rowSelected }">
                  <template v-if="rowSelected">
                    <span aria-hidden="true">&check;</span>
                    <span class="sr-only">Selected</span>
                  </template>
                  <template v-else>
                    <span aria-hidden="true">&nbsp;</span>
                    <span class="sr-only">Not selected</span>
                  </template>
                </template></b-table
              >
            </b-collapse>
            <!-- End of collapse -->
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
          <b-form-group label="乘客定额:">
            <b-form-spinbutton
              type="number"
              v-model="quota"
              min="60"
              max="200"
              step="20"
            ></b-form-spinbutton>
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
    return {
      transProps: {
        name: "flip-list",
      },
      a_c_id: "",
      a_c_name: "",
      start: "",
      destination: "",
      air_model: "",
      flight_num: "",
      start_time: "08:00",
      arrive_time: "14:00",
      quota: 180,
      mileage: "",
      standard_price: "",
      hideHeader: true,
      cityoptions: [
        { value: "SHA", text: "上海", disabled: false },
        { value: "GUA", text: "广州", disabled: false },
        { value: "BEI", text: "北京", disabled: false },
      ],
      options: [],
      fields: [
        "selected",
        "f_id",
        "air_model",
        {
          key: "flight_num",
          sortable: true,
        },
        {
          key: "date",
          sortable: true,
        },
      ],
      items: [],
      selectMode: "single",
      selected: [],
    };
  },
  methods: {
    init_info: function () {
      this.$axios({
        url: this.serverURL + "admin/get_airline_info",
        method: "post",
        data: {
          a_id: this.$cookies.get("a_id"),
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          this.a_c_id = data.a_info.a_c_id;
          this.a_c_name = data.a_info.a_c_name;
        } else {
          this.alerter("错误", data.info);
        }
      });
    },
    submit_info: function () {
      this.$axios({
        url: this.serverURL + "admin/add_airline",
        method: "post",
        withCredentials: true,
        data: {
          a_c_id: this.a_c_id,
          start: this.start,
          destination: this.destination,
          air_model: this.air_model,
          flight_num: this.flight_num,
          start_time: this.start_time,
          arrive_time: this.arrive_time,
          quota: this.quota,
          mileage: this.mileage,
          standard_price: this.standard_price,
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          this.alerter("成功", "航线添加成功");
        } else {
          this.alerter("错误", "相同的航线已存在");
        }
      });
    },
    get_flight_all: function () {
      this.$axios({
        url: this.serverURL + "admin/get_flight_all",
        method: "post",
        data: {
          id: this.$cookies.get("id"),
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          console.log(data.flight_info);
          this.items = data.flight_info;
        } else {
          this.alerter("错误", data);
        }
      });
    },
    onRowSelected: function (items) {
      this.selected = items;
      this.flight_num = this.selected[0].flight_num;
      this.air_model = this.selected[0].air_model;
    },
  },
  created: function () {
    this.init_info();
    this.get_flight_all();
  },
};
</script>

<style scoped>
.card {
  width: 60%;
  margin: 0px auto;
}
.card_body {
  width: 100%;
}
.info-content {
  width: 100%;
}
.flip-list-move {
  transition: transform 1s;
}
</style>