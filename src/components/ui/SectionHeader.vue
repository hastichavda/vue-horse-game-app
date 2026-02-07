<template>
  <div class="mb-6">
    <h2 class="text-2xl font-bold text-text-primary">{{ title }}</h2>
    <p v-if="description" class="text-text-secondary mt-2">{{ description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>
