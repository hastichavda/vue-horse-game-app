import { watch, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { random } from '@/utils/random'

export function useRaceAnimation() {
  const store = useStore()

  let animationId = null
  let lastFrameTime = null

  function calculateSpeed(horse, distance) {
    const baseSpeed = 0.12
    const conditionFactor = 0.5 + (horse.condition / 100) * 0.5
    const randomFactor = 0.85 + random() * 0.3
    const distanceFactor = 0.9 + distance / 20000

    return baseSpeed * conditionFactor * randomFactor * distanceFactor
  }

  function startNextRound() {
    const round = store.getters['race/currentRound']
    if (!round) return

    const participants = store.getters['horse/getHorsesByIds'](
      round.participants,
    ).map((horse) => ({
      horse,
      position: 0,
    }))

    store.dispatch('race/setActiveRound', {
      roundNumber: round.roundNumber,
      distance: round.distance,
      participants,
    })
  }

  function finishCurrentRound() {
    const round = store.state.race.activeRound
    if (!round) return

    const sortedResults = [...round.participants]
      .map((p) => ({ ...p, finalPosition: p.position }))
      .sort((a, b) => {
        if (Math.abs(a.finalPosition - b.finalPosition) > 0.1) {
          return b.finalPosition - a.finalPosition
        }
        return random() - 0.5
      })
      .map(({ finalPosition, ...rest }) => rest)

    store.dispatch('race/finishRound', sortedResults)
    lastFrameTime = null
  }

  function runRaceAnimation() {
    const isRacing = store.state.race.isRacing
    const isPaused = store.state.race.isPaused

    if (!isRacing || isPaused) {
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
      return
    }

    const currentTime = performance.now()
    const deltaTime = lastFrameTime
      ? Math.min((currentTime - lastFrameTime) / 16.67, 2)
      : 1
    lastFrameTime = currentTime

    const activeRound = store.state.race.activeRound
    const currentRound = store.getters['race/currentRound']

    if (!activeRound && currentRound) {
      startNextRound()
      animationId = requestAnimationFrame(runRaceAnimation)
      return
    }

    if (!activeRound) {
      animationId = requestAnimationFrame(runRaceAnimation)
      return
    }

    const round = activeRound
    const allFinished = round.participants.every((p) => p.position >= 95)

    if (allFinished) {
      finishCurrentRound()
      animationId = requestAnimationFrame(runRaceAnimation)
      return
    }

    // Update participant positions
    const updatedParticipants = round.participants.map((participant) => {
      if (participant.position < 95) {
        const speed = calculateSpeed(participant.horse, round.distance)
        const newPosition = participant.position + speed * deltaTime
        return {
          ...participant,
          position: Math.min(95, newPosition),
        }
      }
      return participant
    })

    // Update store with new positions
    store.commit('race/UPDATE_PARTICIPANT_POSITIONS', updatedParticipants)

    animationId = requestAnimationFrame(runRaceAnimation)
  }

  function startAnimation() {
    lastFrameTime = null
    if (!animationId) {
      animationId = requestAnimationFrame(runRaceAnimation)
    }
  }

  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  watch(
    () => store.state.race.isRacing,
    (isRacing) => {
      if (isRacing && !store.state.race.isPaused) {
        startAnimation()
      } else if (!isRacing) {
        stopAnimation()
      }
    },
  )

  watch(
    () => store.state.race.isPaused,
    (isPaused) => {
      if (!isPaused && store.state.race.isRacing) {
        startAnimation()
      }
    },
  )

  onUnmounted(() => {
    stopAnimation()
  })

  return {
    startAnimation,
    stopAnimation,
  }
}
