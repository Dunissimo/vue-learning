<template>
  <form @submit.prevent>
    <h2>Создать пост</h2>

    <custom-input v-focus v-model="post.title" type="text" name="title" id="title" placeholder="Название"/>
    <custom-input v-model="post.body" type="text" name="body" id="body" placeholder="Описание"/>

    <custom-button style="margin-top: 15px;" @click="createPost">Создать</custom-button>
  </form>
</template>

<script>
export default {
  name: "PostForm",
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();

      this.$emit('create', this.post);

      this.post = {
        title: '',
        body: '',
      }

      this.title = '';
      this.body = '';
    }
  }
}
</script>


<style scoped>

</style>