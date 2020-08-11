<template>
  <div class="love">
    <span>
      made with <i class="fas fa-heart"></i> by
      <a target="_blank" href="http://github.com/hsborges">hsborges</a>
    </span>
    <span class="separator">|</span>
    <a
      href="http://github.com/hsborges/waiting-room"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="fab fa-github"></i>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.love {
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  padding: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }

  .separator {
    margin: 0 0.75em;
  }

  .fa-github {
    font-size: 1.25em;
    cursor: pointer;
  }
}
</style>
