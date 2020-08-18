<template>
  <VueDraggableResizable class="content" :class="{ hidden: !showPlayer }">
    <i class="fas fa-arrows-alt"></i>
    <youtube
      ref="youtube"
      :video-id="videoId"
      :player-vars="playerVars"
      :resize="true"
      :fit-parent="true"
      @playing="onPlaying"
      @paused="onPaused"
      @ended="onEnded"
    ></youtube>
  </VueDraggableResizable>
</template>

<script>
import url from "url";
import { mapState } from "vuex";
import VueDraggableResizable from "vue-draggable-resizable";

import "vue-draggable-resizable/dist/VueDraggableResizable.css";

export default {
  components: { VueDraggableResizable },
  mounted() {
    this.$refs.youtube.player.setLoop(true);
    this.$refs.youtube.player.setVolume(this.volume * 100);
  },
  computed: {
    ...mapState("player", ["playing", "muted", "volume"]),
    ...mapState("config", ["song", "showPlayer"]),
    videoId() {
      const { query } = url.parse(this.song, true);
      return query.v;
    },
    playerVars() {
      const { query } = url.parse(this.song, true);
      const vars = { loop: 1, controls: 1 };
      if (query.list)
        return { listType: "playlist", list: query.list, ...vars };
      else return vars;
    }
  },
  methods: {
    play() {
      this.$refs.youtube.player.playVideo();
    },
    onPlaying() {
      this.$store.commit("player/turnOn");
    },
    onPaused() {
      this.$store.commit("player/turnOff");
    },
    onEnded() {
      this.$refs.youtube.player.getPlaylist().then(list => {
        if (list && list.length) {
          this.$refs.youtube.player.nextVideo();
        } else {
          this.$refs.youtube.player.seekTo(0);
          this.$refs.youtube.player.playVideo();
        }
      });
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
    visibility: hidden;
    opacity: 0;
  }

  &:hover i {
    visibility: initial;
    opacity: 1;
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
