<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
    <div>
      <b-button-toolbar>
      <b-button-group>
        <b-button variant="warning" href="#/add_airline">
          <b-icon icon="plus-circle" aria-hidden="true"></b-icon> Add 
        </b-button>
        <b-button variant="danger">
          <b-icon icon="dash-circle" aria-hidden="true"></b-icon> Delete 
        </b-button>
        <b-button variant="info">
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
      fields: [
        "flight_num",
        "start",
        "destination",
        "start_date",
        {
          key: "standard_price",
          lable: "price",
          sortable: true,
        },
      ],
      items: [],
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
  },
  created: function () {
    this.get_airline();
  },
};
</script>

<style scoped>
</style>