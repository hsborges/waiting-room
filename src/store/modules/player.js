const state = () => ({
  playing: false,
  muted: true
});

const mutations = {
  turnOn(state) {
    state.playing = true;
    state.muted = false;
  },

  turnOff(state) {
    state.playing = false;
    state.muted = true;
  },

  mute(state) {
    state.muted = true;
  },

  unmute(state) {
    state.muted = false;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
