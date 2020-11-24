<template>
  <div>
    <b-table sticky-header="600px" head-variant="dark" striped hover :items="items" :fields="fields" selectable
      @row-selected="onRowSelected" responsive="sm" :select-mode="selectMode" primary-key="id"
      :tbody-transition-props="transProps" class="flip-list-move">
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
    <p>
      Selected Rows:<br />
      {{ selected }}
    </p>
    <b-alert v-model="isempty" variant="danger" dismissible>
      请先完善个人信息!
      <b-link class="link" href="#/passenger_inform">前去填写-></b-link>
    </b-alert>
    <div>
      <b-button variant="primary" href="#/choose_seat" @click="onRowSelected" :disabled=isempty>Buy</b-button>
      <b-button variant="danger" href="#/passenger_management">
        <b-icon icon="back" aria-hidden="true"></b-icon> Back
      </b-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShowFlight",
    props: ["alerter"],
    data: function () {
      return {
        transProps: {
          name: "flip-list",
        },
        fields: [
          "selected",
          "id",
          "flight_num",
          "start",
          "destination",
          {
            key: "standard_price",
            lable: "price",
            sortable: true,
          },
          {
            key: "start_time",
          },
          {
            key: "arrive_time",
          },
        ],
        items: [],
        isempty: false,
        selectMode: "single",
        selected: [],
      };
    },
    methods: {
      is_empty: function () {
        this.$axios({
          url: this.serverURL + "passenger/is_empty",
          method: "post",
          data: {
            id: this.$cookies.get("id"),
          },
        }).then((response) => {
          let data = response.data;
          if (data.success) {
            console.log(data.result);
          } else {
            this.isempty = true;
          }
        });
      },
      // 展示所有符合条件的航班
      get_flight: function () {
        this.$axios({
          url: this.serverURL + "passenger/get_flight",
          method: "post",
          data: {
            start: this.$cookies.get("start"),
            destination: this.$cookies.get("destination"),
            start_date: this.$cookies.get("start_date"),
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
        (this.selected = items), console.log(this.selected);
        this.$cookies.set("f_id", this.selected[0].id);
      },
    },
    created: function () {
      this.is_empty();
      this.get_flight();
    },
  };
</script>

<style>
  .flip-list-move {
    transition: transform 1s;
  }
  .link{
    left: 230px;
    position: absolute;
  }
</style>