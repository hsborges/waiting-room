import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VueGtag from "vue-gtag";
import VueShepherd from "vue-shepherd";
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_ANALYTICS }
});
Vue.use(VueShepherd);
Vue.use(VueCookies);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
