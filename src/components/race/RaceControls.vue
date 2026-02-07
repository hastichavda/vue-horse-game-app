<template>
  <header class="mb-6 border-b bg-surface-primary border-surface-elevated">
    <div class="px-6 py-4 mx-auto">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-text-primary">Horse Racing</h1>
        <div class="flex gap-3">
          <Button
            variant="secondary"
            :disabled="!canGenerate || isRacing"
            style="background-color: #426cc1 !important"
            @click="$emit('generate')"
            class="font-semibold tracking-wide uppercase"
          >
            <!-- Heroicon: Arrow Path (refresh/generate) -->
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 0 1 15.364-6.364" />
              <path d="M18 3v6h-6" />
              <path d="M21 12a9 9 0 0 1-15.364 6.364" />
              <path d="M6 21v-6h6" />
            </svg>
            <span>GENERATE PROGRAM</span>
          </Button>
          <Button
            v-if="!isRacing"
            variant="primary"
            style="background-color: aquamarine !important; color: gray"
            :disabled="!canStart"
            @click="$emit('start')"
            class="font-semibold tracking-wide text-gray-500 uppercase hover:shadow-xl"
          >
            <!-- Heroicon: Play -->
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M8.25 5.25a.75.75 0 0 1 1.14-.65l10.5 6.75a.75.75 0 0 1 0 1.3l-10.5 6.75a.75.75 0 0 1-1.14-.65V5.25Z"
              />
            </svg>
            <span>START / PAUSE</span>
          </Button>
          <Button
            v-else
            variant="primary"
            style="background-color: aquamarine !important"
            @click="isPaused ? $emit('resume') : $emit('pause')"
            class="font-semibold tracking-wide text-gray-500 uppercase"
          >
            <svg
              v-if="isPaused"
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <!-- Heroicon: Play -->
              <path
                d="M8.25 5.25a.75.75 0 0 1 1.14-.65l10.5 6.75a.75.75 0 0 1 0 1.3l-10.5 6.75a.75.75 0 0 1-1.14-.65V5.25Z"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <!-- Heroicon: Pause -->
              <path
                d="M6.75 5.25A.75.75 0 0 1 7.5 4.5h2.25a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Z"
              />
              <path
                d="M13.5 5.25a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1-.75-.75V5.25Z"
              />
            </svg>
            <span>{{ isPaused ? 'RESUME' : 'PAUSE' }}</span>
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import Button from '@/components/ui/Button.vue'

const props = defineProps({
  canGenerate: {
    type: Boolean,
    default: true,
  },
  canStart: {
    type: Boolean,
    default: false,
  },
  isRacing: {
    type: Boolean,
    default: false,
  },
  isPaused: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['generate', 'start', 'pause', 'resume'])
</script>
