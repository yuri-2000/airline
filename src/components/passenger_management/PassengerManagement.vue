<template>
  <div>
    <div id="buy_ticket">
      <b-row class="my-1">
        <b-col sm="3">
          <label>出发城市:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="start"
            placeholder="Enter your start"
          ></b-form-input>
        </b-col>
      </b-row>
      <div class="hot key">
        <a href="javascript:;" @click="changeStart('上海')">上海</a>
        <a href="javascript:;" @click="changeStart('广州')">广州</a>
        <a href="javascript:;" @click="changeStart('北京')">北京</a>
      </div>

      <b-row class="my-1">
        <b-col sm="3">
          <label>到达城市:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="destination"
            placeholder="Enter your destination"
          ></b-form-input>
        </b-col>
      </b-row>
      <div class="hot key">
        <a href="javascript:;" @click="changeDestination('上海')">上海</a>
        <a href="javascript:;" @click="changeDestination('广州')">广州</a>
        <a href="javascript:;" @click="changeDestination('北京')">北京</a>
      </div>

      <b-row class="my-1">
        <b-col sm="3">
          <label>出发时间:</label>
        </b-col>
        <b-col sm="8">
          <b-form-datepicker
            v-model="start_date"
            :min="min"
            :max="max"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            :hide-header="hideHeader"
            locale="en"
          ></b-form-datepicker>
        </b-col>
      </b-row>
      <b-button variant="warning" @click="showairline">搜索机票</b-button>
    </div>

    <div>
      <b-button v-b-toggle.sidebar-1> Person </b-button>
    </div>

    <b-sidebar id="sidebar-1" title="Sidebar">
      <div class="px-3 py-2">
        <p>提示：在您订票前请先完善您的个人信息。</p>
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
        <b-link href="#/passenger_inform">个人信息</b-link>
      </div>
    </b-sidebar>

    <b-breadcrumb-item href="#/" class="back">
      <b-icon
        icon="house-fill"
        scale="1.25"
        shift-v="1.25"
        aria-hidden="true"
      ></b-icon>
      Home
    </b-breadcrumb-item>
  </div>
</template>

<script>
export default {
  props: ["alerter"],
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth());
    minDate.setDate(minDate.getDate());
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);

    return {
      hideHeader: true,
      start: "",
      destination: "",
      start_date: "",
      min: minDate,
      max: maxDate,
    };
  },
  methods: {
    showairline: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/passenger/get_airline",
        method: "post",
        data: {
          start: this.start,
          destination: this.destination,
          start_date: this.start_date,
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.$cookies.set("start", this.start);
          this.$cookies.set("destination", this.destination);
          this.$cookies.set("start_date", this.start_date);
          this.$router.push("/show_airline");
        } else this.alertPop("错误", "未找到符合要求的航班");
      });
    },
    changeStart: function (city) {
      this.start = city;
    },
    changeDestination: function (city) {
      this.destination = city;
    },
    goback() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#buy_ticket {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 0px auto;
  height: 100%;
  width: 500px;
}

.back {
  height: 50px;
  width: 7%;
  right: 0px;
  top: 0px;
  position: absolute;
  color: #83afb6da;
}
</style>