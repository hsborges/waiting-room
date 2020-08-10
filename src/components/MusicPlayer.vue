<template>
  <audio id="player" :autoplay="autoplay" loop>
    <source src="audio/dance.mp3" type="audio/mpeg" />
  </audio>
</template>

<script>
export default {
  data() {
    return {
      autoplay: true
    };
  },
  mounted() {
    this.$root.$on(
      "mute",
      () => (document.getElementById("player").muted = true)
    );
    this.$root.$on(
      "unmute",
      () => (document.getElementById("player").muted = false)
    );
  }
};
</script>
