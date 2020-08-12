<template>
  <div>
    <i
      class="fas"
      :class="{ 'fa-volume-up': !muted, 'fa-volume-mute': muted }"
      @click.prevent="enabled = !enabled"
    ></i>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return { enabled: false };
  },
  computed: {
    ...mapState("player", ["playing", "muted"])
  },
  methods: {
    ...mapMutations("player", ["turnOn", "mute"])
  },
  watch: {
    enabled(value) {
      if (value) this.turnOn();
      else this.mute();
    }
  }
};
</script>

<style scoped>
i {
  cursor: pointer;
}
</style>
