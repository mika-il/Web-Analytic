import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
// import "material-design-icons-iconfont/dist/material-design-icons.css";

import vuetify from "./plugins/vuetify";
import IdleVue from "idle-vue";

Vue.config.productionTip = false;

const eventsHub = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 900000, // 15 Min.
  startAtIdle: false
});
