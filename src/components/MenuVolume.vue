<template>
  <div>
    <i
      class="fas"
      :class="{ 'fa-volume-up': playing, 'fa-volume-mute': !playing }"
      @click.prevent="enabled = !enabled"
    ></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enabled: false
    };
  },
  computed: {
    player() {
      return this.$root.$refs["music-player"];
    },
    playing() {
      return this.enabled && this.player.playing;
    }
  },
  watch: {
    enabled(value) {
      this.player[value ? "play" : "mute"]();
    }
  }
};
</script>

<style scoped>
i {
  cursor: pointer;
}
</style>
