<template>
  <div>
    <i
      class="fas"
      :class="{ 'fa-volume-up': enabled, 'fa-volume-mute': !enabled }"
      @click.prevent="enabled = !enabled"
    ></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enabled: true
    };
  },
  watch: {
    enabled(value) {
      this.$root.$emit(value ? "unmute" : "mute");
    }
  }
};
</script>

<style scoped>
i {
  cursor: pointer;
}
</style>
