<template>
  <div>
    <div>
      <b-row>
        <b-card
          bg-variant="light"
          title="航班管理"
          sub-title="Airline-Management"
          img-src="https://cdn.pixabay.com/photo/2016/04/07/17/49/aircraft-1314333_960_720.png"
          img-alt="Image"
          img-top
          img-height="400"
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text>
            在这里管理你公司旗下的航线，完成添加，删除，修改等功能。
          </b-card-text>

          <b-breadcrumb-item href="#/airline_management">
            <b-icon
              icon="arrow-right"
              animation="cylon"
              font-scale="4"
              shift-h="50"
            ></b-icon>
          </b-breadcrumb-item>
        </b-card>

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
          class="mb-2"
        >
          <b-card-text>
            在这里完善你的个人资料，修改密码，公司名称等。
          </b-card-text>

          <b-breadcrumb-item href="#/admin_information">
            <b-icon
              icon="arrow-right"
              animation="cylon"
              font-scale="4"
              shift-h="50"
            ></b-icon>
          </b-breadcrumb-item>
        </b-card>
      </b-row>
    </div>

    <div>
      <b-button variant="outline-info" class="back" href="#/admin_login">
        <b-icon icon="power" aria-hidden="true"></b-icon> Logout
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.back {
  height: 50px;
  right: 0px;
  top: 0px;
  position: absolute;
  color: #83afb6da;
}
</style>