<template>
  <div id="app">
    <router-view />
    <Love />
    <MusicPlayer ref="musicPlayer" />
  </div>
</template>

<script>
import Love from "@/components/MadeWithLove.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";

export default {
  components: { Love, MusicPlayer }
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
  background-image: url("assets/background-dark.jpg");
  background-size: cover;
  color: white;
}

@media screen and (max-width: 600px) {
  html,
  body {
    font-size: 10px;
  }
}
</style>
