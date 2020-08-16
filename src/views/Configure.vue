<template>
  <div class="content">
    <Menu class="menu" />
    <div class="header">
      <span>Options</span>
      <span class="separator"></span>
    </div>
    <div class="options">
      <div class="option">
        <div class="label">Title</div>
        <div class="input">
          <input type="text" v-model="config.title" />
        </div>
      </div>
      <div class="option">
        <div class="label">Subtitle</div>
        <div class="input">
          <input type="text" v-model="config.subtitle" />
        </div>
      </div>
      <div class="option">
        <div class="label">Song</div>
        <div class="input">
          <input type="url" v-model="config.song" />
          <i class="fab fa-youtube"></i>
        </div>
        <div class="checkbox">
          <input type="checkbox" v-model="config.showPlayer" /> Show player
        </div>
      </div>
    </div>
    <div class="buttons">
      <div
        class="button"
        :class="{ disabled: saved || restored }"
        @click="restore"
      >
        Defaults
        <i
          class="fas"
          :class="{ 'fa-undo': !restored, 'fa-check': restored }"
        ></i>
      </div>
      <div
        class="button"
        :class="{ disabled: saved || restored }"
        @click="save"
      >
        {{ saved ? "Saved" : "Save" }}
        <i class="fas" :class="{ 'fa-save': !saved, 'fa-check': saved }"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MenuBuilder from "@/builders/MenuBuilder.js";

export default {
  components: {
    Menu: new MenuBuilder()
      .showVolume()
      .showHome()
      .build()
  },
  data() {
    return {
      config: { ...this.$store.state.config },
      saved: false,
      restored: false
    };
  },
  computed: {
    ...mapState("config", ["title", "subtitle", "song", "showPlayer"])
  },
  methods: {
    save() {
      if (this.config.song !== this.song) this.$store.commit("player/turnOff");
      this.$store.commit("config/updateConfig", this.config);
      this.saved = true;
      setTimeout(() => (this.saved = false), 2000);
    },
    restore() {
      this.$store.commit("player/turnOff");
      this.$store.commit("config/restore");
      this.config = { ...this.$store.state.config };
      this.restored = true;
      setTimeout(() => (this.restored = false), 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  font-family: "Iceland", cursive;
  padding-top: 10vh;
  padding-left: 30%;
  width: 40%;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 4em;
    text-align: center;

    .separator {
      border-bottom: 2px solid;
      margin: 10px 0 0.5em 0;
      width: 100%;
    }
  }

  .options {
    .option {
      .label {
        font-size: 1.5em;
      }

      .input {
        display: flex;
        align-items: center;

        width: 100%;
        border-radius: 3px;
        height: 25px;
        background-color: white;

        input {
          padding-left: 2%;
          flex-grow: 1;
          height: 22px;
          background-color: transparent;
          border: none;
          outline: none;
          font-size: 1em;
        }

        .fas,
        .fab {
          justify-self: flex-end;
          font-size: 0.85em;
          margin: 0 10px;
          color: black;
          opacity: 0.75;
        }
      }

      .checkbox {
        float: right;
        font-size: 1.1em;
        margin-top: 5px;
      }

      &:not(:last-child) {
        margin-bottom: 25px;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 75px;

    .button {
      display: flex;
      align-items: center;
      font-size: 1.5em;
      font-weight: bold;
      justify-content: center;
      height: 40px;
      width: 150px;
      background-color: white;
      color: black;
      opacity: 0.75;
      border-radius: 7.5px;
      cursor: pointer;

      i {
        margin-left: 10px;
        font-size: 0.9em;
      }

      &.disabled {
        cursor: not-allowed;
      }
    }

    .button:not(:last-child) {
      margin-right: 25px;
    }
  }
}
</style>
