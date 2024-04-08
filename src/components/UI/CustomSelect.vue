<template>
  <select name="" id="" :value="modelValue" @change="changeOption">
    <option disabled selected value="">{{ defaultOption }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "custom-select",
  props: {
    modelValue: {
      type: String,
    },
    defaultOption: {
      type: String
    },
    options: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    changeOption(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  }

}
</script>

<style scoped>

</style>