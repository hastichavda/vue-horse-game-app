<template>
  <section>
    <div :class="[panelContainerClass, 'bg-white']">
      <slot />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  padding: {
    type: String,
    default: 'normal',
  },
})

const panelContainerClass = computed(() => {
  const paddingMap = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8',
  }

  const padding = paddingMap[props.padding]
  const rounded = 'rounded-lg'
  const shadow = 'shadow-lg'

  const panelClass = [padding, rounded, shadow]

  return panelClass.filter(Boolean).join(' ')
})
</script>
