<template>
  <div class="timer">
    <div v-if="showPicker" class="time-picker">
      <VueTimepicker v-model="timePicker" format="mm:ss" lazy />
      <i class="fas fa-check" @click="showPicker = !showPicker"></i>
    </div>
    <div v-else class="display">
      <VueCountdown
        ref="countdown"
        tag="span"
        :time="timeLeft"
        :transform="transform"
        @progress="countdownProgress"
        @end="clear"
      >
        <template slot-scope="props">
          {{ props.minutes }}:{{ props.seconds }}
        </template>
      </VueCountdown>
      <div class="controls" :class="{ visible: !hasTimeLeft }">
        <i class="fas fa-cog" @click="showPicker = !showPicker"></i>
        <i
          v-if="hasTimeLeft"
          class="fas"
          :class="{ 'fa-pause': !paused, 'fa-play': paused }"
          @click="paused = !paused"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import VueCountdown from "@chenfengyuan/vue-countdown";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";

export default {
  components: { VueCountdown, VueTimepicker },
  data() {
    return {
      showPicker: false,
      paused: false,
      timePicker: "00:00",
      timeLeft: null
    };
  },
  created() {
    const startsAt = this.$store.state.timer.startsAt;
    if (startsAt && startsAt > Date.now())
      this.timeLeft = startsAt - Date.now();
  },
  computed: {
    hasTimeLeft() {
      return this.timePicker !== "00:00";
    }
  },
  methods: {
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        props[key] = `${value < 10 ? `0${value}` : value}`;
      });

      return props;
    },
    countdownProgress(value) {
      const format = v => `${v}`.padStart(2, "0");
      this.timePicker = `${format(value.minutes)}:${format(value.seconds)}`;
    },
    clear() {
      this.timePicker = "00:00";
    }
  },
  watch: {
    paused(value) {
      if (value) this.$refs.countdown.abort();
      else this.$refs.countdown.start();
    },
    showPicker(value) {
      if (!value) {
        const [minutes, seconds] = this.timePicker
          .split(":")
          .map(v => parseInt(v, 10));
        this.timeLeft = ((minutes || 0) * 60 + (seconds || 0)) * 1000;
        this.$store.commit("timer/update", Date.now() + this.timeLeft);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.timer {
  height: 75px;
  display: flex;

  * {
    display: flex;
    align-items: center;
  }

  .time-picker {
    font-size: 0.6em;

    i.fas {
      position: absolute;
      margin-left: 8.75em;
      font-size: 0.75em;
      cursor: pointer;
    }
  }

  .display {
    font-size: 0.95em;
    margin: 0 50px;

    .controls {
      position: absolute;
      margin-left: 2.5em;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0.1s linear, opacity 0.1s linear;
    }

    i.fas {
      font-size: 0.4em;
      padding-left: 10px;
      cursor: pointer;
    }
  }

  .display:hover .controls {
    opacity: 1;
    visibility: visible;
  }

  .controls.visible {
    opacity: 1;
    visibility: visible;
  }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .timer {
    font-size: 0.9em;

    .display {
      i.fas {
        font-size: 0.6em;
      }

      .fa-pause,
      .fa-play {
        visibility: hidden;
      }
    }
  }
}
</style>
