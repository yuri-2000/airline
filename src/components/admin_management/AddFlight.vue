<template>
  <div>
    <template>
      <b-card title="添加航班" sub-title="Add Airline"></b-card>
      <b-card header="航班信息" class="info-content">
        <b-form>
          <b-form-group label="所属机场:">
            <b-form-select
              type="number"
              v-model="airport_id"
              :options="idoptions"
            ></b-form-select>
          </b-form-group>
          <b-form-group label="所属航线:">
            <b-form-input type="text" v-model="airline_id"></b-form-input>
            <b-button v-b-toggle.my-collapse>显示航线</b-button>
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
          <b-form-group label="执飞飞机:">
            <b-form-input
              type="text"
              v-model="airplane_id"              
            ></b-form-input>
          </b-form-group>
          <b-form-group label="航班号:">
            <b-form-input type="text" v-model="flight_num"></b-form-input>
          </b-form-group>
          <b-form-group label="出发日期:">
            <b-form-datepicker
              v-model="start_date"
              :hide-header="hideHeader"
              :min="min"
              :max="max"
            ></b-form-datepicker>
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
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth());
    minDate.setDate(minDate.getDate());
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);
    return {
       transProps: {
        name: "flip-list",
      },
      airport_id: "",
      airplane_id: "",
      airline_id: "",
      flight_num: "",
      start_date: "",
      min: "",
      max: "",
      hideHeader: true,
      idoptions: [
        { value: "1", text: "首都机场", disabled: false },
        { value: "2", text: "白云机场", disabled: false },
        { value: "3", text: "虹桥机场", disabled: false },
      ],
      fields: [
        "selected",
        "airline_id",
        "start",
        "destination",
        {
          key: "start_time",
          sortable: true,
        },
        {
          key: "mileage",
          sortable: true,
        },
      ],
      items: [],
      selectMode: "single",
      selected: [],
    };
  },
  methods: {
    submit_info: function () {
      this.$axios({
        url: this.serverURL + "admin/add_flight",
        method: "post",
        data: {
          airport_id: this.airport_id,
          airline_id: this.airline_id,
          airplane_id: this.airplane_id,
          flight_num: this.flight_num,
          start_date: this.start_date,
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
    get_airline_all: function () {
      this.$axios({
        url: this.serverURL + "admin/get_airline_all",
        method: "post",
        data: {},
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          console.log(data.airline_info);
          this.items = data.airline_info;
        } else {
          this.alerter("错误", data);
        }
      });
    },
    onRowSelected: function (items) {
      (this.selected = items), (this.airline_id = this.selected[0].airline_id);
    },
  },
  created: function () {
    this.get_airline_all();
  },
};
</script>

<style scoped>
.info-content {
  width: 100%;
}
.flip-list-move {
  transition: transform 1s;
}
</style>