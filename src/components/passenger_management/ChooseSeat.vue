<template>
  <div>
    <b-card class="seat" title="挑选座位">
      <div>
        <b-form-group label="Choose Seat">
          <b-form-radio
            v-model="CLass"
            name="some-radios"
            value="eco"
            @change="changetoeco"
            >经济舱</b-form-radio
          >
          <b-form-radio
            v-model="CLass"
            name="some-radios"
            value="fir"
            @change="changetofir"
            >头等舱</b-form-radio
          >
        </b-form-group>
      </div>
      <div v-for="i in ecolength / 10" :key="i" v-show="eco_seat">
        <b-row>
          <div v-for="j in 10" :key="j">
            <!-- seatsClass.indexOf((m - 1) * 10 + n + '') == 'fir' ? 'danger' : 'primary', -->
            <b-button
              :variant="
                seatsNums.indexOf((i - 1) * 10 + j + '') !== -1
                  ? 'danger'
                  : 'primary'
              "
              :disabled="
                seatsNums.indexOf((i - 1) * 10 + j + '') !== -1 ? true : false
              "
              class="seat_button"
              @click="get_seat((i - 1) * 10 + j)"
            >
              {{ (i - 1) * 10 + j }}
            </b-button>
            <span v-if="j == 5" class="blank"></span>
          </div>
        </b-row>
      </div>
      <div v-for="m in firlength / 10" :key="m" v-show="fir_seat">
        <b-row>
          <div v-for="n in 10" :key="(m - 1) * 10 + n">
            <b-button
              :variant="
                seatsNums.indexOf((m - 1) * 10 + n + '') !== -1
                  ? 'danger'
                  : 'primary'
              "
              :disabled="
                seatsNums.indexOf((m - 1) * 10 + n + '') !== -1 ? true : false
              "
              @click="get_seat((m - 1) * 10 + n)"
              class="seat_button"
            >
              {{ (m - 1) * 10 + n }}
            </b-button>
            <span v-if="n == 5" class="blank"></span>
          </div>
        </b-row>
      </div>
      <div>
        <b-row>
          <label for="input">座位号：</label>
          <b-form-input v-model="seat_num" class="input"> </b-form-input>
        </b-row>
      </div>
      <div>
        <b-row>
          <b-button variant="danger" href="#/show_flight" class="back"
            >返回</b-button
          >
        </b-row>
      </div>
      <div>
        票价:
        <strong
          >{{ price * type }} (-{{ numFilter(price * (1 - type)) }})</strong
        >
      </div>
      <div>
        余票量: <strong>{{ ecolength + firlength - rest }}</strong>
      </div>
      <div class="add_ticket">
        <b-button variant="info" @click="add_ticket">生成订票</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ChooseSeat",
  props: ["alerter"],
  data: function () {
    return {
      seat_num: "",
      ecolength: "",
      firlength: "",
      num: "",
      a_id: "",
      id: "",
      f_id: "",
      CLass: "eco",
      start: "",
      destination: "",
      standard_price: "",
      price: "",
      type: "",
      rest: "",
      seats: [],
      eco_seat: true,
      fir_seat: false,
      ischoosed: false,
    };
  },
  computed: {
    seatsNums() {
      let i = this.seats.map((i) => {
        return i.seat_num;
      });
      return i;
    },
    seatsClass() {
      let j = this.seats.map((i) => {
        return i.CLass;
      });
      return j;
    },
  },
  methods: {
    numFilter(value) {
      const realVal = parseFloat(value).toFixed(2);
      return realVal;
    },
    init_info: function () {
      this.$axios({
        url: this.serverURL + "passenger/get_seat",
        method: "post",
        withCredentials: true,
        data: {
          f_id: this.$cookies.get("f_id"),
          id: this.$cookies.get("id"),
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          console.log(data);
          this.ecolength = data.eco;
          this.firlength = data.fir;
          this.price = data.standard_price;
          this.type = data.type;
        } else {
          this.alerter("错误", data.info);
        }
      });
    },
    init_seat: function () {
      this.$axios({
        url: this.serverURL + "passenger/get_seat_all",
        method: "post",
        withCredentials: true,
        data: {
          f_id: this.$cookies.get("f_id"),
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          this.seats = data.s_info;
          this.rest = this.seats.length;
          console.log(this.seats);
        } else {
          this.alerter("错误", data.info);
        }
      });
    },
    add_ticket: function () {
      this.$axios({
        url: this.serverURL + "passenger/add_ticket",
        method: "post",
        withCredentials: true,
        data: {
          a_id: this.$cookies.get("a_id"),
          id: this.$cookies.get("id"),
          f_id: this.$cookies.get("f_id"),
          seat_num: this.seat_num,
          CLass: this.CLass,
          start: this.$cookies.get("start"),
          destination: this.$cookies.get("destination"),
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          console.log(this.a_id);
          this.alerter("成功", "订票成功");
          this.$router.push("/passenger_management");
        } else {
          this.alerter("错误", data.info);
        }
      });
    },
    get_seat: function (num) {
      this.seat_num = num;
    },
    changetoeco: function () {
      this.fir_seat = false;
      this.eco_seat = true;
      this.seat_num = "";
    },
    changetofir: function () {
      this.eco_seat = false;
      this.fir_seat = true;
      this.seat_num = "";
    },
  },
  created: function () {
    this.init_info();
    this.init_seat();
  },
};
</script>

<style scoped>
.seat {
  margin: 0px auto;
  margin-top: 500px auto;
  position: relative;
  width: 770px;
}
.blank {
  display: inline-block;
  width: 100px;
}
.seat_button {
  width: 59px;
  margin-right: 5px;
  margin-bottom: 7px;
  color: rgb(255, 255, 255);
}
.add_ticket {
  margin-top: 20px;
  text-align: center;
  position: relative;
}
.red {
  color: rgb(255, 0, 0);
}
.blue {
  color: rgb(255, 255, 255);
}
</style>