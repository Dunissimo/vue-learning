<template>
  <div class="app">
    <navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {Navbar}
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h2 {
  font-weight: 400;
}
.app {
  max-width: 50%;
  margin: 0 auto;
  padding: 15px;
}
</style>