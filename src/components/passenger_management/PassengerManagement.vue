<template>
  <div id="buy_ticket" >

    <b-row class="my-1">
      <b-col sm="3">
        <label>出发城市:</label>
      </b-col>
      <b-col sm="8">
        <b-form-input placeholder="Enter your start"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="3">
        <label>到达城市:</label>
      </b-col>
      <b-col sm="8">
        <b-form-input placeholder="Enter your destination"></b-form-input>
      </b-col>
    </b-row>

    <!-- <b-row class="my-1">
      <b-col sm="3">
        <label>Sex:</label>
      </b-col>
      <b-col sm="2">
          <b-form-radio v-model="selected" name="some-radios" >男</b-form-radio>
          <b-form-radio v-model="selected" name="some-radios" >女</b-form-radio>
      </b-col>
    </b-row> -->

    
    <b-row class="my-1">
      <b-col sm="3">
        <label>出发时间:</label>
      </b-col>
      <b-col sm="8">
        <b-form-datepicker v-model="start_date" :min="min" :max="max" 
        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
        :hide-header="hideHeader" locale="en"></b-form-datepicker>
      </b-col>
    </b-row>

    <b-breadcrumb-item href="#/" class="footer">
      <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
      Home
    </b-breadcrumb-item>
  </div>
</template>

<script>
 export default {
    data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today)
      minDate.setMonth(minDate.getMonth())
      minDate.setDate(minDate.getDate())
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth() + 2)
      maxDate.setDate(15)

      return {
        hideHeader: true,
        start_date: '',
        min: minDate,
        max: maxDate
      }
    },
    methods: {
        goback(){
            this.$router.push('/')
        }
    }
  }
</script>

<style scoped>
#buy_ticket {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin:0px auto;
  height: 100%;
  width: 500px;
}
.footer{
  height: 50px;
  width: 7%;
  right: 0px;
  top: 0px;
  position: absolute;
  color: #b8dadfda;
}
</style>