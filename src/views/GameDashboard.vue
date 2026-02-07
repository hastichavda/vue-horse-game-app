<template>
  <div class="min-h-screen bg-gray-200">
    <RaceControls
      :can-generate="horses.length === 20"
      :can-start="
        store.getters['race/hasProgram'] && !store.state.race.isRacing
      "
      :is-racing="store.state.race.isRacing"
      :is-paused="store.state.race.isPaused"
      @generate="handleGenerate"
      @start="handleStart"
      @pause="handlePause"
      @resume="handleResume"
    />

    <div class="px-6 pb-6 mx-auto">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <HorseList :horses="horses" />
        </div>

        <div class="lg:col-span-5">
          <RaceTrack
            :participants="raceParticipants"
            :current-round-text="currentRoundText"
          />
        </div>

        <div class="lg:col-span-4">
          <ProgramPanel :program="store.state.race.program" :horses="horses" />
          <ResultsPanel :results="store.state.race.roundResults" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRaceAnimation } from '@/composables/useRaceAnimation'
import HorseList from '@/components/horse/HorseList.vue'
import RaceTrack from '@/components/race/RaceTrack.vue'
import RaceControls from '@/components/race/RaceControls.vue'
import ProgramPanel from '@/components/race/ProgramPanel.vue'
import ResultsPanel from '@/components/race/ResultsPanel.vue'

const store = useStore()

useRaceAnimation()

const horses = computed(() => store.state.horse.horses)

const raceParticipants = computed(() => {
  const activeRound = store.state.race.activeRound
  if (!activeRound) return []
  return activeRound.participants.map((p) => ({
    horse: p.horse,
    position: p.position,
  }))
})

const currentRoundText = computed(() => {
  const round = store.getters['race/currentRound']
  if (!round) return ''
  const suffixes = ['ST', 'ND', 'RD']
  const suffix = round.roundNumber <= 3 ? suffixes[round.roundNumber - 1] : 'TH'
  return `${round.roundNumber}${suffix} Lap ${round.distance}m`
})

function handleGenerate() {
  store.dispatch('horse/generateHorses')
  store.dispatch('race/generateProgram', horses.value)
}

function handleStart() {
  store.dispatch('race/startRace')
}

function handlePause() {
  store.dispatch('race/pauseRace')
}

function handleResume() {
  store.dispatch('race/resumeRace')
}

onMounted(() => {
  store.dispatch('horse/generateHorses')
})
</script>
