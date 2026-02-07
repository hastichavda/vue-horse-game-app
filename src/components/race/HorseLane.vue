<template>
  <div class="relative h-14">
    <div class="absolute left-0 z-10 flex items-center h-full">
      <div
        class="w-5 h-full flex items-center bg-green-500 border-2 border-white justify-center text-xs font-bold text-white shadow-sm"
      >
        <span
          class="inline-block leading-none"
          style="transform: rotate(-90deg)"
          >{{ laneNumber }}</span
        >
      </div>
    </div>
    <div
      :class="[
        laneNumber === 1 ? 'border-t' : '',
        'absolute inset-0 border-b border-dashed border-gray-900 flex items-center',
      ]"
    >
      <div
        class="absolute transition-all duration-75 ease-linear z-20"
        :style="{
          left: `${position}%`,
          transform: 'translateX(-50%)',
        }"
      >
        <div class="relative">
          <img
            :src="HorseIcon"
            alt="Horse"
            :class="[{ 'animate-bounce': position != 95 }, 'w-12 h-12']"
            :style="{ filter: `drop-shadow(0 0 4px ${horse.color})` }"
          />

          <div
            v-if="position >= 95"
            class="absolute -top-1 -right-1 w-5 h-5 bg-accent-primary rounded-full flex items-center justify-center shadow-lg"
          >
            <svg
              class="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute right-0 top-0 bottom-0 w-1 bg-red-500"></div>
  </div>
</template>

<script setup>
import HorseIcon from '@/assets/horse-silhouette.svg'

const props = defineProps({
  laneNumber: {
    type: Number,
    required: true,
  },
  horse: {
    type: Object,
    required: true,
  },
  position: {
    type: Number,
    required: true,
    default: 0,
  },
})
</script>
