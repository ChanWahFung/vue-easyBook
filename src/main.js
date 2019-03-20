import Vue from 'vue';
import App from './App.vue';
import axios from 'axios'
import router from './router';
import store from './store/store'
import 'iview/dist/styles/iview.css';
import iviewComponent from './ivew.config' // iview components
import { Message,LoadingBar } from 'iview'; // iview global func

Object.keys(iviewComponent).forEach(key=>{
  Vue.component(key, iviewComponent[key])
})

Vue.prototype.$Message = Message;
Vue.prototype.$Loading = LoadingBar;

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

Vue.filter('k', function(val){
  return (val/1000).toFixed(1) + 'k'
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
