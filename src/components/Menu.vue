<template>
  <div class="menu">
    <Volume v-if="showVolume" />
    <Config v-if="showConfig" />
    <Home v-if="showHome" />
  </div>
</template>

<script>
import Volume from "@/components/MenuVolume.vue";
import Config from "@/components/MenuConfig.vue";
import Home from "@/components/MenuHome.vue";

export default {
  props: { showVolume: Boolean, showConfig: Boolean, showHome: Boolean },
  components: { Volume, Config, Home }
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: row;
  padding-right: 10px;

  position: absolute;
  right: 0;
  top: 0;

  * {
    display: flex;
    align-items: center;
    margin: 15px 5px 0 0;
    font-size: 1.15em;
  }

  *:last-child {
    margin-right: 5px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .menu {
    font-size: 1.5em;
    padding-right: 5px;
    margin-top: -5px;
  }
}
</style>
