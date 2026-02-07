import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseList from '@/components/horse/HorseList.vue'

describe('HorseList.vue', () => {
  const dummyHorses = [
    { id: 1, name: 'Horse1', condition: 60, color: '#FF0000' },
    { id: 2, name: 'Horse2', condition: 70, color: '#00FF00' },
  ]

  it('need to render horses race list', () => {
    const container = mount(HorseList, {
      props: {
        horses: dummyHorses,
      },
    })

    expect(container.text()).toContain('Horse1')
    expect(container.text()).toContain('Horse2')
    expect(container.text()).toContain('60')
    expect(container.text()).toContain('70')
  })

  it('need to display horse colors', () => {
    const container = mount(HorseList, {
      props: {
        horses: dummyHorses,
      },
    })

    const horseColorDiv = container.findAll('.w-4.h-4')
    expect(horseColorDiv.length).toBeGreaterThan(0)
  })

  it('need to render table headers', () => {
    const container = mount(HorseList, {
      props: {
        horses: dummyHorses,
      },
    })

    expect(container.text()).toContain('Name')
    expect(container.text()).toContain('Condition')
    expect(container.text()).toContain('Color')
  })
})
