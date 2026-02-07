import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResultsPanel from '@/components/race/ResultsPanel.vue'

describe('ResultsPanel.vue', () => {
  const mockRaceResults = [
    {
      roundNumber: 1,
      distance: 1200,
      results: [
        { horse: { id: 1, name: 'Horse1', color: '#FF0000' } },
        { horse: { id: 2, name: 'Horse2', color: '#00FF00' } },
      ],
    },
  ]

  it('need to render results', () => {
    const container = mount(ResultsPanel, {
      props: {
        results: mockRaceResults,
      },
    })

    expect(container.text()).toContain('Results')
    expect(container.text()).toContain('1ST Lap')
    expect(container.text()).toContain('1200')
    expect(container.text()).toContain('Horse1')
    expect(container.text()).toContain('Horse2')
  })

  it('need to display empty state when no results', () => {
    const container = mount(ResultsPanel, {
      props: {
        results: [],
      },
    })

    expect(container.text()).toContain('No results yet')
  })

  it('need to display round labels correctly', () => {
    const results = [
      { roundNumber: 1, distance: 1200, results: [] },
      { roundNumber: 2, distance: 1400, results: [] },
      { roundNumber: 3, distance: 1600, results: [] },
      { roundNumber: 4, distance: 1800, results: [] },
    ]

    const container = mount(ResultsPanel, {
      props: {
        results,
      },
    })

    expect(container.text()).toContain('1ST Lap')
    expect(container.text()).toContain('2ND Lap')
    expect(container.text()).toContain('3RD Lap')
    expect(container.text()).toContain('4TH Lap')
  })
})
