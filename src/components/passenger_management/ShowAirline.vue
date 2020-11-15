<template>
  <div>
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
    >
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
    <div>
      <b-button variant="primary" href="#/choose_seat" @click="onRowSelected"
        >Buy</b-button
      >
      <b-button variant="danger" href="#/passenger_management">
        <b-icon icon="back" aria-hidden="true"></b-icon> Back
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowAirline",
  props: ["alerter"],
  data: function () {
    return {
      transProps: {
        name: "flip-list",
      },
      fields: [
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
          key: "start_date",
        },
        "selected",
      ],
      items: [],
      selectMode: "single",
      selected: [],
    };
  },
  methods: {
    // 展示所有符合条件的航班
    get_airline: function () {
      this.$axios({
        url: this.serverURL + "passenger/get_airline",
        method: "post",
        data: {
          start: this.$cookies.get("start"),
          destination: this.$cookies.get("destination"),
          start_date: this.$cookies.get("start_date"),
        },
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
      (this.selected = items), console.log(this.selected);
    },
  },
  created: function () {
    this.get_airline();
  },
};
</script>

<style>
.flip-list-move {
  transition: transform 1s;
}
</style>