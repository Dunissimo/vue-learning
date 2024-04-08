<template>
  <div class="app">
    <modal v-model:show="show">
      <post-form @create="createPost" />
    </modal>

    <div>
      <div>
        <div style="display: flex; gap: 15px; justify-content: space-between">
          <custom-button @click="showModal">Создать пост</custom-button>

          <custom-select v-model="selectedSort" :options="sortOptions" defaultOption="Сортировать по"/>
        </div>
        <custom-input v-model="searchByTitle" placeholder="Найти по названию" />
      </div>

      <posts-list :posts="sortedAndFiltered" @remove="removePost" v-if="!isLoading" />
      <div v-else style="text-align: center; margin-top: 20px; font-size: 32px; font-weight: 700">Загрузка...</div>
    </div>

    <div class="pagination">
      <div
          v-for="pageNumber in totalPages"
          :key="page"
          @click="setPage(pageNumber)"
          class="pagination__item"
          :class="{
            'current': page === pageNumber
          }"
      >
        {{ pageNumber }}
      </div>

    </div>
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";
import PostForm from "@/components/PostForm.vue";
import axios from "axios";
import CustomSelect from "@/components/UI/CustomSelect.vue";
import CustomInput from "@/components/UI/CustomInput.vue";

export default {
  name: "App",
  components: {
    CustomInput,
    CustomSelect,
    PostsList, PostForm
  },
  data() {
    return {
      posts: [],
      show: false,
      isLoading: true,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ],
      searchByTitle: '',

      page: 1,
      limit: 10,
      totalPages: 0,
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        return a[this.selectedSort]?.localeCompare(b[this.selectedSort]);
      });
    },
    sortedAndFiltered() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchByTitle.toLowerCase()));
    }
  },
  watch: {
    page() {
      this.fetchPosts();
    }
  },
  methods: {
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

    async fetchPosts() {
      try {
        this.isLoading = true;
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });

        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
        this.posts = res.data;

      } catch(e) {
        this.isLoading = false;
        alert('Error! ' + e.message);
      } finally {
        this.isLoading = false;
      }
    }
  }
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

.pagination {
  display: flex;
  margin-top: 15px;
}

.pagination__item {
  border: 1px solid #000;
  padding: 5px 10px;
  cursor: pointer;
}
.pagination__item:hover {
  background: teal;
  color: #fff;
}

.current {
  background: teal;
  color: #fff;
}

</style>