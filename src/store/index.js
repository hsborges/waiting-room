import Vue from "vue";
import Vuex from "vuex";
import persistedstate from "vuex-persistedstate";

import config from "./modules/config";
import player from "./modules/player";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { player, config },
  plugins: [persistedstate({ paths: ["config"] })],
  strict: process.env.NODE_ENV !== "production"
});
