<template>
  <div>
    <b-row>
      <b-card
        bg-variant="light"
        title="个人信息"
        sub-title="Personal-Information"
        img-src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png"
        img-alt="Image"
        img-height="400"
        img-top
        tag="article"
        style="max-width: 20rem"
      >
        <b-card-text>
          在这里完善你的个人资料，修改密码，公司名称等。
        </b-card-text>

        <div @click="redirect2('passenger_inform')" style="cursor: pointer">
          <b-breadcrumb-item>
            <b-icon
              icon="arrow-right"
              animation="cylon"
              font-scale="4"
              shift-v="-26"
              shift-h="50"
            ></b-icon>
          </b-breadcrumb-item>
        </div>
      </b-card>

      <b-card
        bg-variant="light"
        title="航班订票"
        sub-title="Base-Information"
        img-src="https://cdn.pixabay.com/photo/2016/04/07/17/49/aircraft-1314335_960_720.png"
        img-alt="Image"
        img-height="400"
        img-top
        tag="article"
        style="max-width: 20rem"
      >
        <div id="buy_ticket">
          <b-row>
            <label>出发城市:</label>
            <b-col sm="9">
              <b-form-input
                v-model="start"
                placeholder="Enter your start"
              ></b-form-input>
            </b-col>
          </b-row>
          <div class="hot key">
            <a href="javascript:;" @click="changeStart('SHA')">上海</a>
            <a href="javascript:;" @click="changeStart('GUA')">广州</a>
            <a href="javascript:;" @click="changeStart('BEI')">北京</a>
          </div>

          <b-row>
            <label>到达城市:</label>
            <b-col sm="9">
              <b-form-input
                v-model="destination"
                placeholder="Enter your destination"
              ></b-form-input>
            </b-col>
          </b-row>
          <div class="hot key">
            <a href="javascript:;" @click="changeDestination('SHA')">上海</a>
            <a href="javascript:;" @click="changeDestination('GUA')">广州</a>
            <a href="javascript:;" @click="changeDestination('BEI')">北京</a>
          </div>

          <b-row>
            <label>出发日期:</label>
            <b-col sm="9">
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
          <div class="botton">
            <b-button variant="warning" @click="showairline">搜索机票</b-button>
          </div>
        </div>
      </b-card>

      <b-card
        bg-variant="light"
        title="订票信息"
        sub-title="Ticket-Information"
        img-src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png"
        img-alt="Image"
        img-height="400"
        img-top
        tag="article"
        style="max-width: 20rem"
      >
        <b-card-text>
          在这里完善你的个人资料，修改密码，公司名称等。
        </b-card-text>

        <div @click="redirect2('show_ticket')" style="cursor: pointer">
          <b-breadcrumb-item>
            <b-icon
              icon="arrow-right"
              animation="cylon"
              font-scale="4"
              shift-v="-26"
              shift-h="50"
            ></b-icon>
          </b-breadcrumb-item>
        </div>
      </b-card>
    </b-row>

    <div>
      <b-button variant="outline-info" class="back" href="#/">
        <b-icon icon="power" aria-hidden="true"></b-icon> Logout
      </b-button>
    </div>
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
    redirect2: function (url) {
      this.$router.push(url);
    },
    showairline: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/passenger/get_flight",
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
          this.$router.push("/show_flight");
        } else this.alertPop("错误", "未找到符合要求的航班");
      });
    },
    changeStart: function (city) {
      this.start = city;
    },
    changeDestination: function (city) {
      this.destination = city;
    },
  },
};
</script>

<style scoped>
#buy_ticket {
  text-align: center;
  margin: 0px auto;
  height: 100%;
  width: 100%;
}

.botton{
  margin-top: 27.5px;
}
.back {
  height: 50px;
  right: 0px;
  top: 0px;
  position: absolute;
  color: #83afb6da;
}
</style>