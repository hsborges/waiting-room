<template>
  <audio id="player" loop>
    <source src="audio/jazz_blues.mp3" type="audio/mpeg" />
  </audio>
</template>

<script>
export default {
  mounted() {
    this.$root.$refs["music-player"] = this;
  },
  methods: {
    play() {
      this.player.play();
      this.player.muted = false;
    },
    mute() {
      this.player.muted = true;
    }
  },
  computed: {
    player() {
      return document.getElementById("player");
    },
    paused() {
      return this.player.paused;
    },
    playing() {
      return this.player.duration > 0 && !this.player.paused;
    },
    muted() {
      return this.player.muted;
    }
  }
};
</script>
