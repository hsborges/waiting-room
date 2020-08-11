<template>
  <div class="timer">
    <div v-if="showPicker" class="time-picker">
      <VueTimepicker v-model="data" format="mm:ss" />
      <i class="fas fa-check" @click="showPicker = !showPicker"></i>
    </div>
    <div v-else class="display">
      <span>{{ data.mm || "00" }}:{{ data.ss || "00" }}</span>
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
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";

export default {
  components: { VueTimepicker },
  data() {
    return {
      showPicker: false,
      paused: false,
      data: {
        mm: "00",
        ss: "00"
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(this.decrement.bind(this), 1000);
    });
  },
  computed: {
    hasTimeLeft() {
      return parseInt(this.data.mm, 10) > 0 || parseInt(this.data.ss, 10) > 0;
    }
  },
  methods: {
    decrement() {
      if (this.showPicker || this.paused) return;

      let minutes = parseInt(this.data.mm, 10);
      let seconds = parseInt(this.data.ss, 10);

      if (minutes > 0 || seconds > 0) {
        if (seconds === 0) {
          minutes -= 1;
          seconds += 60;
        }

        seconds -= 1;

        this.data.mm = `${minutes}`.padStart(2, "0");
        this.data.ss = `${seconds}`.padStart(2, "0");
      }
    }
  },
  watch: {
    data() {
      this.paused = false;
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
    font-size: 0.85em;
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
