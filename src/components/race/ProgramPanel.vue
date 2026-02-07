<template>
  <PanelSection padding="none" class="mb-4">
    <div class="bg-blue-500 rounded-t-lg p-2">
      <h3 class="text-lg font-bold text-white">Program</h3>
    </div>
    <div class="overflow-y-auto max-h-[350px] custom-scrollbar">
      <div
        v-for="round in program"
        :key="round.roundNumber"
        class="mb-4 last:mb-0"
      >
        <div class="text-sm p-2 bg-gray-200 font-bold text-gray-900 mb-2">
          {{ getRoundLabel(round.roundNumber) }} - {{ round.distance }}m
        </div>

        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="text-left py-1 px-2 text-gray-900 font-semibold">
                Position
              </th>
              <th class="text-left py-1 px-2 text-gray-900 font-semibold">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(horseId, index) in round.participants"
              :key="horseId"
              class="border-b border-gray-300 hover:bg-gray-100"
            >
              <td class="py-1 px-3.5 text-gray-900">{{ index + 1 }}</td>
              <td class="py-1 px-3.5 text-gray-900">
                {{ getHorseName(horseId) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="program.length === 0"
        class="text-gray-900 text-sm text-center py-8"
      >
        No program yet
      </div>
    </div>
  </PanelSection>
</template>

<script setup>
import PanelSection from '@/components/ui/PanelSection.vue'

const props = defineProps({
  program: {
    type: Array,
    required: true,
  },
  horses: {
    type: Array,
    required: true,
  },
})

function getRoundLabel(roundNumber) {
  const suffixes = ['ST', 'ND', 'RD']
  const suffix = roundNumber <= 3 ? suffixes[roundNumber - 1] : 'TH'
  return `${roundNumber}${suffix} Lap`
}

function getHorseName(horseId) {
  const horse = props.horses.find((h) => h.id === horseId)
  return horse ? horse.name : 'Unknown'
}
</script>
