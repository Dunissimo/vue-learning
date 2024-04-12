<template>
  <div>
    <modal v-model:show="show">
      <post-form />
    </modal>

    <div>
      <div>
        <div style="display: flex; gap: 15px; justify-content: space-between">
<!--          <custom-button @click="showModal">Создать пост</custom-button>-->

          <custom-select v-model="selectedSort" :options="sortOptions" defaultOption="Сортировать по"/>

<!--          <custom-select v-model="selectedType" :options="typeOptions" defaultOption="Тип подгрузки данных"/>-->
        </div>
        <custom-input v-model="searchByTitle" placeholder="Найти по названию" />
      </div>

      <posts-list :posts="sortedAndFilteredPosts"  v-if="!isLoading" />
      <div v-else style="text-align: center; margin-top: 20px; font-size: 32px; font-weight: 700">Загрузка...</div>
    </div>

    <div
        ref="observer"
        class="observer"
        v-if="selectedType === 'intersection'"
        v-intersection="{func: loadMorePosts, page, totalPages}"
    ></div>
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";
import PostForm from "@/components/PostForm.vue";
import CustomSelect from "@/components/UI/CustomSelect.vue";
import CustomInput from "@/components/UI/CustomInput.vue";
import Pagination from "@/components/UI/Pagination.vue";
import Navbar from "@/components/Navbar.vue";
import {ref} from "vue";
import CustomButton from "@/components/UI/CustomButton.vue";
import {usePosts} from "@/hooks/usePosts";
import {useSortedPosts} from "@/hooks/useSortedPosts";
import {useSortedAndFilteredPosts} from "@/hooks/useSortedAndFilteredPosts";

export default {
  name: "App",
  components: {
    CustomButton,
    Navbar,
    Pagination,
    CustomInput,
    CustomSelect,
    PostsList, PostForm
  },
  data() {
    return {
      show: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ],
      typeOptions: [
        {value: 'pagination', name: 'Пагинация'},
        {value: 'intersection', name: 'Бесконечная лента'},
      ],
    }
  },
  setup(props) {
    const {posts, isLoading, totalPages} = usePosts(10);
    const {selectedSort, sortedPosts} = useSortedPosts(posts);
    const {searchByTitle, sortedAndFilteredPosts} = useSortedAndFilteredPosts(sortedPosts);

    return {
      isLoading,
      totalPages,
      selectedSort,
      searchByTitle,
      sortedAndFilteredPosts
    }
  }
}
</script>

<style>
.observer {
  height: 30px;
}
</style>