<template>
  <PanelSection padding="none">
    <div class="bg-green-500 rounded-t-lg p-2">
      <h3 class="text-lg font-bold text-white">Results</h3>
    </div>
    <div class="overflow-y-auto max-h-[350px] custom-scrollbar">
      <div
        v-for="raceResult in results"
        :key="raceResult.roundNumber"
        class="mb-4 last:mb-0"
      >
        <div class="text-sm p-2 bg-gray-200 font-bold text-gray-900 mb-2">
          {{ getRaceRoundLabel(raceResult.roundNumber) }} -
          {{ raceResult.distance }}m
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
              v-for="(entry, index) in raceResult.results"
              :key="entry.horse.id"
              class="border-b border-gray-300 hover:bg-gray-100"
            >
              <td class="py-1 px-2 text-gray-900">{{ index + 1 }}</td>
              <td class="py-1 px-2">
                <div class="flex items-center gap-2">
                  <div
                    class="w-3 h-3 rounded-full"
                    :style="{ backgroundColor: entry.horse.color }"
                  ></div>
                  <span class="text-gray-900">{{ entry.horse.name }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="results.length === 0"
        class="text-gray-900 text-sm text-center py-8"
      >
        No results yet
      </div>
    </div>
  </PanelSection>
</template>

<script setup>
import PanelSection from '@/components/ui/PanelSection.vue'

const props = defineProps({
  results: {
    type: Array,
    required: true,
  },
})

function getRaceRoundLabel(roundNumber) {
  const suffixes = ['ST', 'ND', 'RD']
  const suffix = roundNumber <= 3 ? suffixes[roundNumber - 1] : 'TH'
  return `${roundNumber}${suffix} Lap`
}
</script>
