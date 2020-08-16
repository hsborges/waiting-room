<template>
  <VueDraggableResizable class="content" :class="{ hidden: !showPlayer }">
    <i class="fas fa-arrows-alt"></i>
    <youtube :video-id="videoId" ref="youtube"></youtube>
  </VueDraggableResizable>
</template>

<script>
import { mapState } from "vuex";
import { getIdFromUrl } from "vue-youtube";
import VueDraggableResizable from "vue-draggable-resizable";

import "vue-draggable-resizable/dist/VueDraggableResizable.css";

export default {
  components: { VueDraggableResizable },
  mounted() {
    this.$refs.youtube.player.setVolume(this.volume * 100);
  },
  computed: {
    ...mapState("player", ["playing", "muted", "volume"]),
    ...mapState("config", ["song", "showPlayer"]),
    videoId() {
      return getIdFromUrl(this.song);
    }
  },
  methods: {
    play() {
      this.$refs.youtube.player.playVideo();
    }
  },
  watch: {
    playing(value) {
      if (value) this.$refs.youtube.player.playVideo();
      else this.$refs.youtube.player.mute();
    },
    muted(value) {
      if (value) this.$refs.youtube.player.mute();
      else this.$refs.youtube.player.unMute();
    },
    volume(value) {
      this.$refs.youtube.player.setVolume(value * 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  bottom: 25px;
  left: 25px;
  border: none;

  i {
    float: right;
    padding: 0 0 5px 5px;
  }
}

.hidden {
  width: 0px !important;
  height: 0px !important;
  display: none;
}
</style>

<style lang="scss">
iframe {
  width: 100%;
  height: auto;
}
</style>
