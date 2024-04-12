<template>
  <div>
    <modal v-model:show="show">
      <post-form @create="createPost" />
    </modal>

    <div>
      <div>
        <div style="display: flex; gap: 15px; justify-content: space-between">
          <custom-button @click="showModal">Создать пост</custom-button>

          <custom-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" defaultOption="Сортировать по"/>

          <custom-select :model-value="selectedType" @update:model-value="setSelectedType" :options="typeOptions" defaultOption="Тип подгрузки данных"/>
        </div>
        <custom-input :model-value="searchByTitle" @update:model-value="setSearch" placeholder="Найти по названию" />
      </div>

      <posts-list :posts="sortedAndFiltered" @remove="removePost" v-if="!isLoading" />
      <div v-else style="text-align: center; margin-top: 20px; font-size: 32px; font-weight: 700">Загрузка...</div>
    </div>

    <div
        ref="observer"
        class="observer"
        v-if="selectedType === 'intersection'"
        v-intersection="{func: loadMorePosts, page, totalPages}"
    ></div>

    <pagination v-if="selectedType === 'pagination'" @setPage="setPage" :total-pages="totalPages" :page="page"/>
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";
import PostForm from "@/components/PostForm.vue";
import CustomSelect from "@/components/UI/CustomSelect.vue";
import CustomInput from "@/components/UI/CustomInput.vue";
import Pagination from "@/components/UI/Pagination.vue";
import Navbar from "@/components/Navbar.vue";
import CustomButton from "@/components/UI/CustomButton.vue";
import {mapState, mapGetters, mapActions, mapMutations} from "vuex";
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
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isLoading: state => state.post.isLoading,
      page: state => state.post.page,
      totalPages: state => state.post.totalPages,
      selectedSort: state => state.post.selectedSort,
      selectedType: state => state.post.selectedType,
      searchByTitle: state => state.post.searchByTitle,
      sortOptions: state => state.post.sortOptions,
      typeOptions: state => state.post.typeOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndFiltered: 'post/sortedAndFiltered',
    })
  },
  watch: {
    // page() {
    //   if (this.selectedType === 'pagination') {
    //     this.fetchPosts();
    //   }
    // },
    // selectedType() {
    //   if (this.selectedType === 'pagination') {
    //     this.page = 1;
    //     this.posts = [];
    //     this.fetchPosts();
    //   }
    //
    //   return this.selectedType;
    // }
  },
  methods: {
    ...mapGetters({

    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
    ...mapMutations({
      setPage: 'post/setPage',
      setSelectedSort: 'post/setSelectedSort',
      setSelectedType: 'post/setSelectedType',
      setSearch: 'post/setSearchByTitle',
    }),

    createPost(post) {
      this.posts.push(post);
      this.show = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showModal() {
      this.show = true;
    },
    setPage(page) {
      this.page = page;
    },
  }
}
</script>

<style>
.observer {
  height: 30px;
}
</style>