import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';
import VueAxios from 'vue-axios';
//设置基础路径，请求时就可以忽略
axios.defaults.baseURL = 'http://101.96.128.94:9999/mfresh/data/';
//把基础路径提取到外部书写:优点:一旦路径发生变化,可以修改此处即可让所有代码都可用
//axios.defaults.baseURL = 'http://mfresh.applinzi.com/data/';

Vue.use(VueAxios, axios);

//注册全局过滤器
import { date } from "./filter";
Vue.filter('date', date);

//全局注册swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
