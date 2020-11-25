<template>
  <div>
    <div class="filter_input">
      <b-form-datepicker v-model="start_date" placeholder="Pick a date"></b-form-datepicker>
      <br>
      <b-form-input v-model="flight_num" placeholder="Enter the flight number"></b-form-input>
      <b-button pill variant="warning" @click="filterticekt()" class="filter_button">筛选</b-button>
      <b-button pill variant="success" @click="clear()" class="clear_button">清除</b-button>
      <b-button pill variant="danger" @click="deleteticket" class="delete_button">退票</b-button>
    </div>
    <div class="checkall">
      <span>全选</span>
      <b-form-checkbox
        v-model="checkall"
        @change="changeAllChecked()"
      ></b-form-checkbox>
    </div>
    <div class="section" v-for="ticket in tickets" :key="ticket">
      <b-form-checkbox class="checkbox" v-model="checked" :value="ticket.t_id">
      </b-form-checkbox>

      <div class="tpd-plan">
        <div class="tp-flight-plan">
          <div class="container-fluid">
            <div class="crop depart">
              <div
                class="context collapsed"
                data-toggle="collapse"
                data-target="#demo"
              >
                <div class="item it-1">
                  <label class="trip-type depart">Departure</label>
                  <div class="airline-image">
                    <!-- seat -->
                    <div :key="ticket.seat_num" class="df-text">
                      {{ ticket.seat_num }}
                    </div>
                    <span class="img-wrapper">
                      <svg class="anime-airplane">
                        <use xlink:href="#airplane"></use>
                      </svg>
                      <span class="top-label">Direct</span>
                    </span>
                  </div>

                  <div class="port-seg">
                    <div class="flight-seg origin">
                      <!-- start_time -->
                      <div :key="ticket.start_time" class="time">
                        {{ ticket.start_time }}
                      </div>
                      <div :key="ticket.start" class="port">
                        {{ ticket.start }}
                      </div>
                      <!-- flight_num -->
                      <div class="name">Istanbul</div>
                    </div>
                    <div class="flight-seg destination">
                      <!-- arrive_time -->
                      <div :key="ticket.arrive_time" class="time">
                        {{ ticket.arrive_time }}
                      </div>
                      <div :key="ticket.destination" class="port">
                        {{ ticket.destination }}
                      </div>
                      <!-- destination -->
                      <div class="name">Ankara</div>
                    </div>
                  </div>
                </div>
                <div class="item it-2">
                  <div class="dr-row">
                    <!-- flight_num -->
                    <span :key="ticket.flight_num" class="al-name">
                      {{ ticket.flight_num }}</span
                    >
                  </div>
                  <!-- start_date -->
                  <div :key="ticket.start_date" class="take-tim">
                    {{ ticket.start_date }}
                  </div>
                  <div :key="ticket.CLass" class="take-tim">
                    {{ ticket.CLass }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        display="none"
      >
        <symbol id="airplane" viewBox="243.5 245.183 25 21.633">
          <g>
            <path
              d="M251.966,266.816h1.242l6.11-8.784l5.711,0.2c2.995-0.102,3.472-2.027,3.472-2.308
                                  c0-0.281-0.63-2.184-3.472-2.157l-5.711,0.2l-6.11-8.785h-1.242l1.67,8.983l-6.535,0.229l-2.281-3.28h-0.561v3.566
                                  c-0.437,0.257-0.738,0.724-0.757,1.266c-0.02,0.583,0.288,1.101,0.757,1.376v3.563h0.561l2.281-3.279l6.535,0.229L251.966,266.816z
                                  "
            />
          </g>
        </symbol>
      </svg>
    </div>
    <b-button variant="danger" href="#/passenger_management" class="back"
      >返回</b-button
    >
  </div>
</template>

<script>
export default {
  name: "ShowTicket",
  props: ["alerter"],
  inject: ["reload"],
  data: function () {
    return {
      tickets: [],
      t_id: "",
      flight_num: "",
      start: "",
      destination: "",
      seat_num: "",
      start_time: "",
      arrive_time: "",
      start_date: "",
      CLass: "",
      checked: [],
      checkall: false,
    };
  },
  watch: {
    checkedNames: function () {
      if (this.checked.length == this.tickets.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  methods: {
    changeAllChecked: function () {
      if (this.checkall) {
        for (let n = 0; n < 100; n++) {
          this.checked.push(this.tickets[n].t_id)
        }
      } else {
        this.checked = [];
      }
    },
    clear: function () {
      this.start_date = "";
      this.flight_num = "";
      this.showticket();
    },
    showticket: function () {
      this.$axios({
        url: this.serverURL + "passenger/get_ticket",
        method: "post",
        data: {
          id: this.$cookies.get("id"),
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          console.log(data.ticket_info);
          console.log(data.ticket_info[0].t_id);
          this.tickets = data.ticket_info;
        } else {
          this.alerter("错误", "暂无订票信息");
        }
      });
    },
    deleteticket: function () {
      this.$axios({
        url: this.serverURL + "passenger/delete_ticket",
        method: "post",
        data: {
          checked: this.checked,
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          this.alerter("成功", "退票成功");
          this.reload();
        } else {
          this.alerter("错误", data);
        }
      });
    },
    filterticekt: function () {
      this.$axios({
        url: this.serverURL + "passenger/filter_ticket",
        method: "post",
        data: {
          id: this.$cookies.get("id"),
          start_date: this.start_date,
          flight_num: this.flight_num,
        },
      }).then((response) => {
        let data = response.data;
        if (data.success) {
          console.log(data.ticket_info);
          this.tickets = data.ticket_info;
        } else {
          this.alerter("错误", data);
        }
      });
    },
  },
  created: function () {
    this.showticket();
  },
};
</script>

<style>
.filter_input {
  width: 50%;
  top: 30px;
  margin: 0 auto;
  position: relative;
}
.filter_button{
  left: 250px;
  margin-top: 30px;
  position: relative;
}
.clear_button{
  left: 400px;
  margin-top: 30px;
  position: relative;
}
.delete_button{
  left: 550px;
  margin-top: 30px;
  position: relative;
}
.checkall{
  top: 40px;
  left: 500px;
  position: relative;
}
.checkbox {
  left: -20px;
  top: 60px;
  color: rgb(255, 255, 255);
  position: relative;
}

.back {
  position: absolute;
  margin-bottom: 20px;
  text-align: center;
}

.section {
  max-width: 700px;
  margin: 25px auto;
}

/* flight plan */
.tpd-body .flight-plain {
  margin-left: -15px;
  margin-right: -15px;
}

.tpd-body .flight-plain .f-lbl {
  font-size: 13px;
}

.tpd-body .flight-plain .fg-row {
  font-size: 14px;
}

.tpd-body .flight-plain .depart-row,
.tpd-body .flight-plain .return-row {
  border-bottom: dashed 1px #d3d3d3;
  padding: 0 0 10px 0;
  margin-bottom: 10px;
}

.tpd-body .flight-plain .depart-row p.fg-prg i.fa {
  color: #3e67c0;
}

/* end of flight plan */

/* new flight plan */
.tp-flight-plan {
  font-family: "Open Sans", sans-serif;
  font-size: 1.2em;
  color: #363c44;
  font-size: 14px;
}

.tp-flight-plan .crop {
  position: relative;
  border: 1px solid #e2e2e2;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 10px;
}

.tp-flight-plan .context {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: stretch;
  padding: 10px;
  /* position: relative; */
  background: #f5f5f5;
}

.tp-flight-plan .crop .item {
  margin: 0px;
  display: flex;
  justify-content: center;
}

.tp-flight-plan .crop .trip-type {
  position: absolute;
  left: -5px;
  top: -19px;
  line-height: normal;
  background-color: #f5f5f5;
  border-radius: 3px;
  padding: 5px 10px 0;
  color: #ff9800;
  font-size: 11px;
  width: 85px;
  text-align: center;
}

.tp-flight-plan .item.it-1 {
  flex-grow: 5;
  display: flex;
  position: relative;
}

.tp-flight-plan .item.it-1:before {
  content: "";
  position: absolute;
  width: calc(100% - 30px);
  height: 2px;
  /*background-color: #878787;*/
  border-top: dashed 1px #9e9e9e;
  top: 50%;
  left: 15px;
  margin-top: -1px;
}

.tp-flight-plan .it-1 .port-seg {
  display: flex;
  flex: 3;
  position: relative;
}

.tp-flight-plan .it-1 .port-seg .flight-seg {
  flex: 1;
  text-align: left;
  padding-bottom: 5px;
  padding-left: 5px;
}

.tp-flight-plan .it-1 .flight-seg.origin {
  padding-left: 5px;
}

.tp-flight-plan .it-1 .flight-seg .time {
  font-size: 20px;
  color: #232b38;
  font-weight: 700;
}

.tp-flight-plan .it-1 .flight-seg .port {
  display: inline-block;
  background-color: #f5f5f5;
  padding: 0 25px 0 0;
  font-size: 16px;
  color: #878787;
  line-height: 1.2;
}

.tp-flight-plan .it-1 .flight-seg .name {
  font-size: 12px;
  color: #878787;
  line-height: 1.2;
}

.tp-flight-plan .it-1 .flight-seg.destination {
  text-align: right;
  padding-right: 15px;
}

.tp-flight-plan .flight-seg.destination .port {
  padding: 0 0 0 25px;
}

.tp-flight-plan .it-1 .airline-image {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  padding: 0 20px;
  height: 21px;
}

.tp-flight-plan .it-1 .img-wrapper {
  flex: 1;
  text-align: center;
  position: relative;
}

.tp-flight-plan .it-1 .top-label {
  color: #47cf73;
  font-size: 11px;
}

.tp-flight-plan .it-1 .df-text {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translate(-50%, -100%);
  font-size: 11px;
  color: #a2a9b3;
  text-align: center;
}

.tp-flight-plan .it-2 .al-name {
  display: block;
}

.tp-flight-plan .item.it-2 {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  flex-direction: column;
  flex: 2 2 100px;
}

.tp-flight-plan .item.it-2 .dr-row {
  display: flex;
  flex-direction: row;
}

.tp-flight-plan .item.it-2 .airline-logo {
  max-width: 100%;
  max-height: 100%;
}

.tp-flight-plan .item.it-2 .take-tim {
  font-size: 12px;
  color: gray;
  line-height: 20px;
}

.tp-flight-plan .anime-airplane {
  position: absolute;
  width: 30px;
  height: 25px;
  top: -87%;
  opacity: 0;
}

.tp-flight-plan .crop.depart .anime-airplane {
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  left: 10%;
  -webkit-animation: move 3s infinite;
  animation: move 3s infinite;
}

.tp-flight-plan .crop.return .anime-airplane {
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  right: 10%;
  -ms-transform: rotate(180deg);
  /* IE 9 */
  -webkit-transform: rotate(180deg);
  /* Safari */
  transform: rotate(180deg);
  -webkit-animation: move-right 3s infinite;
  animation: move-right 3s infinite;
}

.tp-flight-plan .crop.depart svg {
  fill: #3e67c0;
}

@keyframes move {
  50% {
    left: 50%;
    opacity: 1;
  }

  100% {
    left: 90%;
    opacity: 0;
  }
}

/* end of new flight plan*/
</style>