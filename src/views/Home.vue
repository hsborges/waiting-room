<template>
  <div class="home">
    <Menu class="menu" />
    <div class="message">
      <span class="header">
        <i class="fas fa-microphone"></i>
        <i class="fas fa-headphones"></i>
        <span spellcheck="false" contenteditable="true">
          {{ $store.state.config.title }}
        </span>
      </span>
      <span class="subheader" spellcheck="false" contenteditable="true">
        {{ $store.state.config.subtitle }}
      </span>
    </div>
    <Timer class="timer" />
  </div>
</template>

<script>
import MenuBuilder from "@/builders/MenuBuilder.js";
import Timer from "@/components/Timer.vue";

export default {
  name: "Home",
  components: {
    Menu: new MenuBuilder()
      .showVolume()
      .showConfig()
      .build(),
    Timer
  },
  mounted() {
    setTimeout(this.tour, 3000);
  },
  methods: {
    tour() {
      if (this.$cookies.get("tour")) return;

      this.$nextTick(() => {
        const tour = this.$shepherd({
          useModalOverlay: true,
          defaultStepOptions: {
            scrollTo: { behavior: "smooth", block: "center" },
            modalOverlayOpeningRadius: 5,
            popperOptions: {
              modifiers: { name: "offset", options: { offset: [0, 20] } }
            },
            classes: "shepherd-popup"
          }
        });

        tour.addStep({
          attachTo: { element: ".message", on: "auto" },
          text: `
          Welcome! Meeting waiting room is a simple app to you share your screen while the meeting not starts ...
          <br><br>
          Hey, you can change this text by clicking on it \\o/
          `,
          buttons: [
            {
              action() {
                return this.next();
              },
              classes: "dark-button",
              text: "Next"
            }
          ]
        });

        tour.addStep({
          attachTo: { element: ".timer", on: "auto" },
          text:
            "... <br> you can configure a countdown timer with minutes and seconds <br> ...",
          buttons: [
            {
              action() {
                return this.back();
              },
              secondary: true,
              text: "Previous"
            },
            {
              action() {
                return this.next();
              },
              classes: "dark-button",
              text: "Next"
            }
          ]
        });

        tour.addStep({
          attachTo: { element: ".menu", on: "bottom-start" },
          text:
            "... turn sound on/off and change the default configuration (including sound). Enjoy it!",
          buttons: [
            {
              action() {
                return this.back();
              },
              secondary: true,
              text: "Previous"
            },
            {
              action() {
                return this.complete();
              },
              classes: "dark-button",
              text: "Close"
            }
          ]
        });

        tour.on("complete", () => {
          this.$cookies.set("tour", 1, "1y");
        });

        tour.on("cancel", () => {
          this.$cookies.set("tour", 1, "1m");
        });

        tour.start();
      });
    }
  }
};
</script>

<style lang="scss">
.shepherd-popup {
  text-align: center;
}

.dark-button {
  background: #3f434c;
  font-weight: bold;
}
</style>

<style lang="scss" scoped>
.menu {
  padding-left: 25px;
  padding-bottom: 15px;
}

.home {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
  cursor: default;

  .message {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 4.5em;
    padding: 15px;

    .header {
      font-family: "Bungee", cursive;
      font-weight: bold;
      padding-bottom: 15px;
      border-bottom: 2px solid white;

      .fa-microphone {
        padding-right: 25px;
        float: left;
      }

      .fa-headphones {
        padding-left: 25px;
        float: right;
      }
    }

    .subheader {
      font-family: "Iceland", cursive;
    }
  }

  .timer {
    font-size: 3.75em;
    margin-top: 75px;
  }
}

@media screen and (max-width: 600px) {
  .message {
    .header {
      span {
        display: block;
      }

      i {
        margin-bottom: 10px;
        float: initial !important;
      }
    }
  }
}
</style>
