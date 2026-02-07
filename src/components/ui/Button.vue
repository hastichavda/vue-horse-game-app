<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span class="btn-overlay"></span>
    <span class="btn-text">
      <slot />
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const buttonClasses = computed(() => {
  const base = 'btn-base'
  const variant = `btn-${props.variant}`

  const baseArray = [base, variant]

  return baseArray.filter(Boolean).join(' ')
})
</script>
