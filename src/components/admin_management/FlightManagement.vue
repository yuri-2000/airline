<template>
  <div>
    <b-table
      sticky-header="580px"
      head-variant="dark"
      striped
      hover
      :items="items"
      :fields="fields"
      :filter="filter"
      selectable
      @row-selected="onRowSelected"
      responsive="sm"
      :select-mode="selectMode"
      primary-key="f_id"
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
    <div class="filter">
      <b-input-group size="sm">
        <b-form-input
          v-model="filter"
          type="search"
          id="filterInput"
          placeholder="Type to Search"
        ></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <div class="button">
      <b-button-toolbar>
        <b-button-group>
          <b-button variant="warning" href="#/add_flight">
            <b-icon icon="plus-circle" aria-hidden="true"></b-icon> Add
          </b-button>
          <b-button
            variant="danger"
            @click="delete_flight"
          >
            <b-icon icon="file-earmark" aria-hidden="true"></b-icon> Delete
          </b-button>
          <b-button
            variant="info"
            href="#/flight_information"
            @click="chooseairline"
          >
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
        { key: "flight_num" },
        { key: "eco", sortable: true },
        { key: "fir", sortable: true },
        { key: "date", sortable: true },
      ],
      filter: null,
      items: [],
      selectMode: "range",
      selected: [],
      a_id: "",
      f_id: "",
    };
  },
  methods: {
    // 展示所有符合条件的航线
    get_flight: function () {
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
    delete_flight: function () {
      this.$axios({
        url: this.serverURL + "admin/delete_flight",
        method: "post",
        data: {
          f_id: this.$cookies.get("f_id"),
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          this.alerter("成功", "删除航班成功！")
          this.get_flight();
        } else {
          this.alerter("错误", "删除失败");
        }
      });
    },
    onRowSelected: function (items) {
      this.selected = items;
      this.$cookies.set("f_id", this.selected[0].f_id);
    },
    chooseairline: function () {
      this.$cookies.set("f_id", this.selected[0].f_id);
    },
  },
  created: function () {
    this.get_flight();
  },
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 1s;
}
.filter {
  width: 50%;
  top: 234px;
  margin: 0px auto;
  position: relative;
}
.button {
  width: 30%;
  left: 100px;
  top: 40px;
  margin: 0px auto;
  position: relative;
}
</style>