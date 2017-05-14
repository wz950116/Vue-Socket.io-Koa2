// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from "vuex"
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "./vuex/store"
import moment from 'moment'

// 本地化，中文时间显示
moment.locale('zh-cn');
//由于monent用ES6方式引入有问题可以添加到原型上使用
Vue.prototype.moment = moment;

//为原型添加生成随机数方法
Vue.prototype.random = n => Math.floor(Math.random()*n);

Vue.use(Vuex)
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
