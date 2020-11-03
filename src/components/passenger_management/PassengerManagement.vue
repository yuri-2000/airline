<template>
  <div>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ text }}</div>
    <b-calendar v-model="value" :min="min" :max="max" locale="en"></b-calendar>
    <b-button @click="goback">返回主界面</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th two months prior
      const minDate = new Date(today)
      minDate.setMonth(minDate.getMonth() - 1)
      minDate.setDate(1)
      // 15th in two months
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth() + 2)
      maxDate.setDate(15)

      return {
        value: '',
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