let seed = Date.now()

export function setSeed(newSeed) {
  seed = newSeed
}

export function random() {
  seed = (seed * 9301 + 49297) % 233280
  return seed / 233280
}

export function randomInt(min, max) {
  return Math.floor(random() * (max - min + 1)) + min
}

export function shuffle(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function pickRandom(array, count) {
  const shuffled = shuffle(array)
  return shuffled.slice(0, count)
}

