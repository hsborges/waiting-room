<template>
  <audio id="player" loop>
    <source src="audio/jazz_blues.mp3" type="audio/mpeg" />
  </audio>
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    this.player.muted = this.muted;
  },
  methods: {
    play() {
      this.player.play();
    },
    stop() {
      this.player.pause();
      this.player.currentTime = 0;
    },
    mute() {
      this.player.muted = true;
    },
    unmute() {
      this.player.muted = false;
    }
  },
  computed: {
    player() {
      return document.getElementById("player");
    },
    ...mapState("player", ["playing", "muted"])
  },
  watch: {
    playing(value) {
      if (value) this.play();
      else this.stop();
    },
    muted(value) {
      if (value) this.mute();
      else this.unmute();
    }
  }
};
</script>
