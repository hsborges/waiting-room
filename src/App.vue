<template>
  <div id="app">
    <router-view class="content" />
    <Love class="footer" />
    <YoutubePlayer v-if="song" />
    <MusicPlayer v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Love from "@/components/MadeWithLove.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import YoutubePlayer from "@/components/YoutubePlayer.vue";

export default {
  components: { Love, MusicPlayer, YoutubePlayer },
  computed: { ...mapState("config", ["song"]) }
};
</script>

<style lang="scss">
@import "~shepherd.js/dist/css/shepherd.css";
@import url("https://fonts.googleapis.com/css2?family=Bungee&family=Iceland&display=swap");

body,
html {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  min-height: 500px;
  background-image: url("assets/background-dark.jpg");
  background-size: cover;
  color: white;
  display: flex;
  flex-direction: column;

  .content {
    flex-grow: 1;
  }
}

@media screen and (max-width: 600px) {
  html,
  body {
    font-size: 10px;
  }
}
</style>
