<template>
  <div class="home">
    <Menu />
    <div class="message">
      <span class="header">
        <i class="fas fa-microphone"></i>
        <i class="fas fa-headphones"></i>
        <span>MEETING</span>
      </span>
      <span class="subheader">Starting soon</span>
      <Timer class="timer" />
    </div>
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
      // .showConfig()
      .build(),
    Timer
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  user-select: none;
  cursor: default;

  .message {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 4.5em;

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

    .timer {
      font-size: 0.75em;
      padding-top: 75px;
    }
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
