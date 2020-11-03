<template>
  <div>
    <b-button @click="goback">乘客管理</b-button>
  </div>
</template>

<script>
  export default {
    methods: {
        goback(){
            this.$router.push('/passenger_management')
        }
    }
  }
</script>