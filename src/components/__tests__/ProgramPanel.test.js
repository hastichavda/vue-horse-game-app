import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProgramPanel from '@/components/race/ProgramPanel.vue'

describe('ProgramPanel.vue', () => {
  const mockProgramTest = [
    {
      roundNumber: 1,
      distance: 1200,
      participants: [1, 2, 3],
    },
    {
      roundNumber: 2,
      distance: 1400,
      participants: [4, 5, 6],
    },
  ]

  const mockHorsesList = [
    { id: 1, name: 'Horse1' },
    { id: 2, name: 'Horse2' },
    { id: 3, name: 'Horse3' },
    { id: 4, name: 'Horse4' },
    { id: 5, name: 'Horse5' },
    { id: 6, name: 'Horse6' },
  ]

  it('need to render program rounds', () => {
    const programContainer = mount(ProgramPanel, {
      props: {
        program: mockProgramTest,
        horses: mockHorsesList,
      },
    })

    expect(programContainer.text()).toContain('1ST Lap')
    expect(programContainer.text()).toContain('2ND Lap')
    expect(programContainer.text()).toContain('1200')
    expect(programContainer.text()).toContain('1400')
  })

  it('need to display horse names for participants', () => {
    const programContainer = mount(ProgramPanel, {
      props: {
        program: mockProgramTest,
        horses: mockHorsesList,
      },
    })

    expect(programContainer.text()).toContain('Horse1')
    expect(programContainer.text()).toContain('Horse2')
    expect(programContainer.text()).toContain('Horse3')
  })

  it('need to handle empty program', () => {
    const programContainer = mount(ProgramPanel, {
      props: {
        program: [],
        horses: mockHorsesList,
      },
    })

    expect(programContainer.text()).toContain('Program')
  })
})
