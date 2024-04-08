<template>
  <div>
    <h2 style="margin-top: 15px;">Список постов</h2>

      <TransitionGroup name="posts">
        <post-item v-if="posts.length > 0" v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
      </TransitionGroup>
      <div v-if="posts.length <= 0">
        <h3>Ничего не найдено, попробуйте другой запрос</h3>
      </div>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";

export default {
  name: "PostsList",
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>
.posts-enter-active,
.posts-leave-active {
  transition: all .5s ease;
}
.posts-enter-from,
.posts-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.posts-move {
  transition: transform .5s ease;
}
</style>