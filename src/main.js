import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import moment from 'moment'
import VueCookies from 'vue-cookies'
import Admin from './components/admin/Admin'
import AdminLogin from './components/admin_management/AdminLogin'
import AdminManagement from './components/admin_management/AdminManagement'
import AdminInformation from './components/admin_management/AdminInformation'
import AirlineManagement from './components/admin_management/AirlineManagement'
import AddAirline from './components/admin_management/AddAirline'
import AddAirport from './components/admin_management/AddAirport'
import AirlineInformation from './components/admin_management/AirlineInformation'
import PassengerManagement from './components/passenger_management/PassengerManagement'
import PassengerInform from './components/passenger_management/PassengerInform'
import ChooseSeat from './components/passenger_management/ChooseSeat'
import ShowFlight from './components/passenger_management/ShowFlight'
import ShowTicket from './components/passenger_management/ShowTicket'
import { BootstrapVue, BIcon, BIconArrowUp, BIconArrowDown, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.prototype.$config = moment;
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookies)
Vue.component('BIcon', BIcon)
Vue.component('BIconArrowUp', BIconArrowUp)
Vue.component('BIconArrowDown', BIconArrowDown)
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
    path: '/show_flight',
    component: ShowFlight,
    metadata: {
      title: '搜索航班'
    },
  },
  {
    path: '/choose_seat',
    component: ChooseSeat,
    metadata: {
      title: '挑选座位'
    },
  },
  {
    path: '/show_ticket',
    component: ShowTicket,
    metadata: {
      title: '搜索订票'
    },
  },
  {
    path: '/admin_login',
    component: AdminLogin,
    metadata: {
      title: '管理员登录'
    },
  },
  {
    path: '/admin_management',
    component: AdminManagement,
    metadata: {
      title: '管理员界面'
    },
  },
  {
    path: '/admin_information',
    component: AdminInformation,
    metadata: {
      title: '管理员信息'
    },
  },
  {
    path: '/airline_management',
    component: AirlineManagement,
    metadata: {
      title: '航班管理'
    },
  },
  {
    path: '/add_airline',
    component: AddAirline,
    metadata: {
      title: '添加航班'
    },
  },
  {
    path: '/add_airport',
    component: AddAirport,
    metadata: {
      title: '添加机场'
    },
  },
  {
    path: '/airline_information',
    component: AirlineInformation,
    metadata: {
      title: '航班信息'
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
