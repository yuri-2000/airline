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
      primary-key="a_id"
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
      <b-button-toolbar>
        <b-button-group>
          <b-button variant="warning" href="#/add_airline">
            <b-icon icon="plus-circle" aria-hidden="true"></b-icon> Add
          </b-button>
          <b-button variant="danger">
            <b-icon icon="dash-circle" aria-hidden="true"></b-icon> Delete
          </b-button>
          <b-button variant="info" href="#/airline_information" @click="chooseairline">
            <b-icon icon="file-earmark" aria-hidden="true"></b-icon> Information
          </b-button>
          <b-button variant="primary" href="#/admin_management">
            <b-icon icon="back" aria-hidden="true"></b-icon> Back
          </b-button>
        </b-button-group>
      </b-button-toolbar>
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
        "selected",
        "flight_num",
        "start",
        "destination",
        { key: "start_date", sortable: true },
        { key: "standard_price", sortable: true },
      ],
      items: [],
      selectMode: "range",
      selected: [],
      a_id: "",
    };
  },
  methods: {
    // 展示所有符合条件的航班
    get_airline: function () {
      this.$axios({
        url: this.serverURL + "admin/get_airline",
        method: "post",
        data: {
          id: this.$cookies.get("id"),
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
      this.selected = items, 
      console.log(this.selected);
      console.log(this.selected[0].a_id);
    },
    chooseairline: function(){
      this.$cookies.set("a_id", this.selected[0].a_id)
    }
  },
  created: function () {
    this.get_airline();
  },
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>