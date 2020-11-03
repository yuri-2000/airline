<template>
  <div>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ text }}</div>
    <b-button @click="goback">123</b-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    },
    methods: {
        goback(){
            this.$router.push('/')
        }
    }
  }
</script>