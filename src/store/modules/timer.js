const state = () => ({
  startsAt: null
});

const mutations = {
  update(state, value) {
    state.startsAt = value;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
