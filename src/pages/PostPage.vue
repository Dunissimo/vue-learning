<template>
  <div>
    <custom-button @click="$router.back()">Back</custom-button>
    <h1>Post #{{$route.params.id}}</h1>

      <post-item v-if="!isLoading" :post="post" />  

    <div v-else style="text-align: center; margin-top: 20px; font-size: 32px; font-weight: 700">Загрузка...</div>
  </div>
</template>

<script>
import axios from "axios";
import PostItem from "@/components/PostItem.vue";

export default {
  components: {PostItem},
  data() {
    return {
      post: {},
      isLoading: true,
    }
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        this.isLoading = true;

        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`);
        console.log(res)
        this.post = res.data;
      } catch(e) {
        this.isLoading = false;
        alert('Error! ' + e.message);
      } finally {
        this.isLoading = false;
      }
    },
  }
}
</script>

<style scoped>
h1 {
  margin-top: 20px;
}
</style>