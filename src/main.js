import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueGtag from "vue-gtag";
import VueShepherd from "vue-shepherd";
import VueCookies from "vue-cookies";
import VueYoutube from "vue-youtube";

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_ANALYTICS }
});
Vue.use(VueShepherd);
Vue.use(VueCookies);
Vue.use(VueYoutube);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
