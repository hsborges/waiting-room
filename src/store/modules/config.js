const defaultState = {
  title: "Meeting",
  subtitle: "Starting soon",
  song: null,
  showPlayer: false
};

const state = () => ({ ...defaultState });

const mutations = {
  restore(state) {
    Object.keys(defaultState).forEach(key => (state[key] = defaultState[key]));
  },
  updateConfig(state, newState) {
    Object.keys(newState).forEach(key => (state[key] = newState[key]));
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
