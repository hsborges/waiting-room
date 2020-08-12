import Vue from "vue";
import Vuex from "vuex";
import player from "./modules/player";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { player },
  strict: process.env.NODE_ENV !== "production"
});
