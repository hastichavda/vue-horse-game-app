<template>
  <PanelSection padding="none">
    <div class="bg-yellow-600 rounded-t-lg p-2">
      <h3 class="text-lg font-bold text-white">Horse List (1-20)</h3>
    </div>
    <div class="overflow-y-auto bg-white max-h-[600px] custom-scrollbar">
      <table class="w-full">
        <thead class="sticky top-0 bg-gray-200">
          <tr class="border-b border-gray-300">
            <th class="text-left py-2 px-3 text-gray-900 text-sm font-bold">
              Name
            </th>
            <th class="text-left py-2 px-3 text-gray-900 text-sm font-bold">
              Condition
            </th>
            <th class="text-left py-2 px-3 text-gray-900 text-sm font-bold">
              Color
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="horse in horses"
            :key="horse.id"
            class="border-b border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <td class="py-2 px-3.5 text-black">{{ horse.name }}</td>
            <td class="py-2 px-3.5 text-black">{{ horse.condition }}</td>
            <td class="py-2 px-3.5">
              <div class="flex items-center gap-2">
                <div
                  class="w-4 h-4 rounded-full border border-gray-300"
                  :style="{ backgroundColor: horse.color }"
                ></div>
                <span class="text-black text-sm">{{ horse.color }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PanelSection>
</template>

<script setup>
import PanelSection from '@/components/ui/PanelSection.vue'

const props = defineProps({
  horses: {
    type: Array,
    required: true,
  },
})
</script>
