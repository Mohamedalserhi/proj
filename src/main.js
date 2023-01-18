import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/vue-fontawesome";

import ElementUI from "element-ui";

import  "element-ui/lib/theme-chalk/index.css";



import axios from 'axios'
import VueAxios from 'vue-axios'

import InputTag from 'vue-input-tag'

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import locale from 'element-ui/lib/locale/lang/en'

Vue.component('input-tag', InputTag)

import VueMeta from 'vue-meta'
 
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

Vue.use(VuePlyr, {
  plyr: {}
})



import CKEditor from 'ckeditor4-vue';

Vue.use( CKEditor );

Vue.use(ElementUI,{locale})

Vue.use(VueAxios, axios)
import "normalize.css";



//768834812579-007e5802er7gj3c93p8qa9568h8bj3na.apps.googleusercontent.com
//859861337698-7r6d3rb0si4j71qfkqpe6ccgrui48kv6.apps.googleusercontent.com
// import GAuth from 'vue-google-oauth2'

// const gauthOption = {
//   clientId: '768834812579-007e5802er7gj3c93p8qa9568h8bj3na.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'consent ',
//   fetch_basic_profile:true,
// }
// Vue.use(GAuth, gauthOption)

import VuePusher from 'vue-pusher';
import Pusher from 'pusher-js';





Pusher.logToConsole = true;
Vue.use(VuePusher, {
  api_key: 'ecfcb8c328a3a23a2978',
  options: {
    cluster: 'ap2',
    // forceTLS: true,
    // authTransport: 'jsonp'
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
