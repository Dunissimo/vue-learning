<template>
  <div class="post">
    <div>
      <h2><strong>Название:</strong> {{ post.title }}</h2>
      <p><strong>Описание:</strong> {{ post.body }}</p>
    </div>

    <div class="post-controls">
      <custom-button @click="$emit('remove', post)">Удалить</custom-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.post {
  margin-top: 15px;
  padding: 15px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>