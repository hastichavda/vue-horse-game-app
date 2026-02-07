<template>
  <PanelSection padding="normal">
    <div class="bg-red-500 rounded-t-lg p-2">
      <h3 class="text-lg font-bold text-white">Race Track</h3>
    </div>

    <div
      class="relative bg-gray-100 rounded-b-lg p-4 min-h-[500px] border border-gray-300"
    >
      <div v-if="participants.length > 0">
        <HorseLane
          v-for="(participant, index) in participants"
          :key="participant.horse.id"
          :lane-number="index + 1"
          :horse="participant.horse"
          :position="participant.position"
        />
      </div>
      <div v-else class="flex items-center justify-center h-full min-h-[500px]">
        <p class="text-gray-900 flex-wrap flex text-center">
          No active races here. Click to generate a program and start racing!
        </p>
      </div>
    </div>

    <div v-if="currentRoundText" class="my-4 p-2 space-y-3">
      <div v-if="participants.length > 0" class="relative">
        <div class="flex items-center justify-between mb-1">
          <div class="text-base font-bold text-gray-900">
            {{ currentRoundText }}
          </div>
          <span class="text-base font-bold text-red-500">FINISH</span>
        </div>
        <div
          class="relative h-3 bg-surface-elevated rounded-full overflow-hidden"
        >
          <div
            class="absolute left-0 top-0 h-full bg-accent-primary transition-all duration-300 ease-out rounded-full"
            :style="{ width: `${raceRoundProgress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </PanelSection>
</template>

<script setup>
import { computed } from 'vue'
import PanelSection from '@/components/ui/PanelSection.vue'
import HorseLane from './HorseLane.vue'

const props = defineProps({
  participants: {
    type: Array,
    required: true,
  },
  currentRoundText: {
    type: String,
    default: '',
  },
})

const raceRoundProgress = computed(() => {
  const participantsArray = props.participants

  if (participantsArray.length === 0) return 0
  const totalPosition = participantsArray.reduce(
    (sum, p) => sum + p.position,
    0,
  )
  const averagePosition = totalPosition / participantsArray.length
  return Math.min(100, (averagePosition / 95) * 100)
})
</script>
