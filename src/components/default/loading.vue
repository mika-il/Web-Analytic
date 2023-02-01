<template>
  <div id="loading-wrapper" class="">
    <v-progress-circular
      size="220"
      width="7"
      color="#20a8d8"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "loading",
  props: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
#loading-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.9);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    font-size: 6vw;
    font-family: "Lato", sans-serif;
    font-weight: 600;
    color: white;
  }
}
</style>
