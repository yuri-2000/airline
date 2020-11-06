<template>
  <div>
    <template>
      <b-row class="my-1">
        <b-col sm="3">
          <label>用户名:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="username"
            placeholder="Username"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="3">
          <label>密码:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            type="password"
            v-model="password"
            placeholder="Password"
          ></b-form-input>
        </b-col>
      </b-row>
    </template>
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
export default {};
</script>

<style scoped>
.back {
  height: 50px;
  width: 7%;
  right: 0px;
  top: 0px;
  position: absolute;
  color: #b8dadfda;
}
</style>