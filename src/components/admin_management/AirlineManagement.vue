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