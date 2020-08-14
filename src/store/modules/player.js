const state = () => ({
  playing: false,
  muted: true,
  volume: 0.75
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
  },

  setVolume(state, volume) {
    state.volume = volume;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
