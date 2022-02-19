<template>
  <div>
    <home :path="path"></home>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import home from "./components/home.vue";
export default {
  name: "App",
  components: {
    home,
  },
  mounted() {
    this.path = this.$route.path;
  },
  data() {
    return {
      path: "",
    };
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  width: 95%;
  box-sizing: border-box;
}
</style>
