import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue } from 'bootstrap-vue'
import store from './store/store'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false;
new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app');
