import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// 隐秘文件挂载全局使用
import secret from './secret'

Vue.prototype.secret = secret;
Vue.config.productionTip = false;

// 引入公共js文件
import config from './config'
import utils from './utils'

// 引入ElementUI组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// 百度地图
import BaiduMap from 'vue-baidu-map';

Vue.use(BaiduMap, { ak: secret.baidu_map_ak });

// 挂载公共js到Vue
Vue.prototype.config = config;
Vue.prototype.utils = utils;
Vue.prototype.$axios = axios;

// 引入公共组件
import Header from './components/Header'
import Footer from './components/Footer'

// 公共组件注册
Vue.component('Header', Header);
Vue.component('Footer', Footer);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
