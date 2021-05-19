import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import './assets/style/icon/iconfont.css';
import PlayerStore from './store/index';
import {message} from './resetMessage';
//接入fundebug-javascript
/*import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";
fundebug.apikey = "3a377b53f2b4e0bd1f46e50e5647fcdd0843e33c2fd1ddca4ba1e69b6dc93eb4"
fundebugVue(fundebug, Vue);*/

Vue.use(Element, { size: 'small' });
Vue.prototype.$message=message
new Vue({
  store: PlayerStore,
  router,
  render: h => h(App)
}).$mount('#app');
