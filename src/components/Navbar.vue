<template>
  <div class="navbar">
    <h2>Vue</h2>

    <custom-button>
      <router-link to="/">Home</router-link>
    </custom-button>

    <custom-button>
      <router-link to="/posts">Posts</router-link>
    </custom-button>

    <custom-button>
      <router-link to="/posts-store">Posts (Store)</router-link>
    </custom-button>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
  height: 50px;
  background: teal;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin-bottom: 30px;
  color: #fff;
  border-radius: 15px;
}
.navbar h2 {
  margin-right: 30px;
}
.navbar a {
  color: #fff;
}
</style>