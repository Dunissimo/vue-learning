<script>
export default {
  name: "pagination",
  props: {
    totalPages: {
      type: Number,
    },
    page: {
      type: Number
    },
  },

  methods: {
    setPage(value) {
      this.$emit('setPage', value);
    }
  }
}
</script>

<template>
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
</template>

<style scoped>

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