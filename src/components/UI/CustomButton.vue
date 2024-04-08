<template>
<button class="button">
  <slot></slot>
</button>
</template>

<script>
export default {
  name: "custom-button"
}
</script>


<style scoped>
.button {
  padding: 10px 15px;
  background: teal;
  color: #fff;
  cursor: pointer;
  outline: none;
  border: none;
}
</style>