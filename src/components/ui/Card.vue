<template>
  <PanelSection :padding="padding">
    <div v-if="title" class="mb-5">
      <h3 class="text-lg font-semibold text-text-primary">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm text-text-muted mt-2">{{ subtitle }}</p>
    </div>
    <slot />
  </PanelSection>
</template>

<script setup>
import PanelSection from './PanelSection.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  padding: {
    type: String,
    default: 'normal',
  },
})
</script>
