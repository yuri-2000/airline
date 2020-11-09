import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import Admin from './components/admin/Admin'
import PassengerManagement from './components/passenger_management/PassengerManagement'
import PassengerInform from './components/passenger_management/PassengerInform'
import ShowAirline from './components/passenger_management/ShowAirline'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookies)
Vue.prototype.$axios = axios
Vue.prototype.serverURL = 'http://127.0.0.1:5000/'

const routes = [
  {
    path: '/',
    component: Admin,
    metadata: {
      title: '航空订票系统'
    }
  },
  {
    path: '/passenger_management',
    component: PassengerManagement,
    metadata: {
      title: '乘客系统'
    },
  },
  {
    path: '/passenger_inform',
    component: PassengerInform,
    metadata: {
      title: '个人信息'
    },
  },
  {
    path: '/passenger_management',
    component: ShowAirline,
    metadata: {
      title: '搜索航班'
    },
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
