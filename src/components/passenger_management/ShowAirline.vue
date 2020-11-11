<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  name: "ShowAirline",
  props: ["alerter"],
  data: function () {
    return {
      fields: [
        "destination",
        "flight_num",
        {
          key: "standard_price",
          lable: "price",
          sortable: true,
        },
        "start",
        {
          key: "start_date",
        },
      ],
      items: [],
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
          console.log(data.airline_info)
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