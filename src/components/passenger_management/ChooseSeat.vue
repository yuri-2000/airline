<template>
  <div>
    <b-card class="seat" title="挑选座位">
      <div v-for="i in length / 10" :key="i">
        <b-row>
          <div v-for="j in 10" :key="j">
            <b-button
              variant="primary"
              size="sm"
              @click="get_seat((i - 1) * 10 + j)"
            >
              {{ (i - 1) * 10 + j }}
            </b-button>
          </div>
        </b-row>
      </div>
      <div>
        <b-row>
          <label for="input">座位号：</label>
          <b-form-input v-model="seat_num" class="input"> </b-form-input>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ChooseSeat",
  data: function () {
    return {
      seat_num: "",
      length: "",
      num: "",
      a_id: "",
    };
  },
  methods: {
    init_info: function () {
      this.$axios({
        url: this.serverURL + "passenger/get_seat",
        method: "post",
        withCredentials: true,
        data: {
          a_id: this.$cookies.get("a_id"),
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          this.length = data.length;
        } else {
          this.alerter("错误", data.info);
        }
      });
    },
    get_seat: function (num) {
      this.seat_num = num;
      console.log(this.list[0]);
    },
  },
  created: function () {
    this.init_info();
  },
};
</script>

<style scoped>
.seat {
  margin: 0px auto;
  margin-top: 500px auto;
  position: relative;
  width: 600px;
}
</style>