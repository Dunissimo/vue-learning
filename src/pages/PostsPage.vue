<template>
  <div>
    <navbar />
    <modal v-model:show="show">
      <post-form @create="createPost" />
    </modal>

    <div>
      <div>
        <div style="display: flex; gap: 15px; justify-content: space-between">
          <custom-button @click="showModal">Создать пост</custom-button>

          <custom-select v-model="selectedSort" :options="sortOptions" defaultOption="Сортировать по"/>

          <custom-select v-model="selectedType" :options="typeOptions" defaultOption="Тип подгрузки данных"/>
        </div>
        <custom-input v-model="searchByTitle" placeholder="Найти по названию" />
      </div>

      <posts-list :posts="sortedAndFiltered" @remove="removePost" v-if="!isLoading" />
      <div v-else style="text-align: center; margin-top: 20px; font-size: 32px; font-weight: 700">Загрузка...</div>
    </div>

    <div ref="observer" class="observer"></div>

    <pagination v-if="selectedType === 'pagination'" @setPage="setPage" :total-pages="totalPages" :page="page"/>
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";
import PostForm from "@/components/PostForm.vue";
import axios from "axios";
import CustomSelect from "@/components/UI/CustomSelect.vue";
import CustomInput from "@/components/UI/CustomInput.vue";
import Pagination from "@/components/UI/Pagination.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Pagination,
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
      selectedType: 'pagination',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ],
      typeOptions: [
        {value: 'pagination', name: 'Пагинация'},
        {value: 'intersection', name: 'Бесконечная лента'},
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
      if (this.selectedType === 'pagination') {
        this.fetchPosts();
      }
    },
    selectedType() {
      if (this.selectedType === 'intersection') {
        const options = {
          rootMargin: "0px",
          threshold: 1.0,
        };

        const callback = (entries, observer) => {
          console.log('obs')
          if (entries[0].isIntersecting && this.page < this.totalPages) {
            this.loadMorePosts();
          }
        }

        console.log(this.$refs)

        const observer = new IntersectionObserver(callback, options);

        observer.observe(this.$refs.observer);
      }
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
      console.log('fe')
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
    },

    async loadMorePosts() {
      this.page += 1;

      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });

        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...res.data];
      } catch(e) {
        alert('Error! ' + e.message);
      }
    }
  }
}
</script>

<style>
.observer {
  height: 30px;
}
</style>