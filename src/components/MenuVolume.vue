<template>
  <div class="volume-control" :class="{ playing: !muted }">
    <i
      class="fas"
      :class="{
        'fa-volume-up': !muted && volume !== 0,
        'fa-volume-mute': muted || volume === 0
      }"
      @click.prevent="enabled = !enabled"
    ></i>
    <VueSlider
      v-model="sliderValue"
      direction="ltr"
      tooltipPlacement="bottom"
      class="slider"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  components: { VueSlider },
  data() {
    return {
      enabled: false,
      sliderValue: 0
    };
  },
  mounted() {
    this.sliderValue = this.volume * 100;
  },
  computed: {
    ...mapState("player", ["playing", "muted", "volume"])
  },
  methods: {
    ...mapMutations("player", ["turnOn", "mute", "setVolume"])
  },
  watch: {
    enabled(value) {
      if (value) this.turnOn();
      else this.mute();
    },
    sliderValue(value) {
      if (value === 0) this.mute();
      else this.setVolume(value / 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.volume-control {
  i {
    cursor: pointer;
    margin-right: 5px;
  }

  .slider {
    visibility: hidden;
    opacity: 0;
    width: 0px !important;
    transition: all 0.2s linear;
  }

  &.playing:hover {
    .slider {
      visibility: visible;
      opacity: 1;
      width: 50px !important;
      margin-right: 5px;
    }
  }
}
</style>
