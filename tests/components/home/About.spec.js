import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { gsap } from 'gsap'
import About from '@/components/home/About.vue'

const originalMatchMedia = window.matchMedia
let timeline

function prefersReducedMotion() {
    window.matchMedia = vi.fn().mockImplementation((query) => ({ matches: true, media: query }))
}

describe('About', () => {
    beforeEach(() => {
        timeline = { from: vi.fn().mockReturnThis(), to: vi.fn().mockReturnThis(), scrollTrigger: { kill: vi.fn() } }
        vi.spyOn(gsap, 'timeline').mockReturnValue(timeline)
    })

    afterEach(() => {
        window.matchMedia = originalMatchMedia
        vi.restoreAllMocks()
    })

    it('shows the numbers of the game and its features', () => {
        const wrapper = mount(About)

        expect(wrapper.findAll('.about__stat-value').map((stat) => stat.text())).toEqual(['17', '12', '62'])
        expect(wrapper.findAll('.about__stat-label').map((label) => label.text())).toEqual([
            'Capítulos',
            'Carpetas',
            'Piezas',
            'Sistema de pistas',
            'Progreso guardado',
            'Ranking jugadores',
        ])
    })

    it('keeps the final value of every number before it starts counting', () => {
        const wrapper = mount(About)

        const finals = wrapper.findAll('.about__stat-value').map((stat) => stat.element.dataset.final)

        expect(finals).toEqual(['17', '12', '62'])
    })

    it('counts every number up to its final value', () => {
        const wrapper = mount(About)
        const [, counting] = timeline.to.mock.calls[0]
        const stats = wrapper.findAll('.about__stat-value').map((stat) => stat.element)

        expect(stats.map((stat, index) => counting.textContent(index, stat))).toEqual(['17', '12', '62'])
    })

    it('starts every number from zero when the count begins', () => {
        const wrapper = mount(About)
        const [, counting] = timeline.to.mock.calls[0]

        counting.onStart()

        expect(wrapper.findAll('.about__stat-value').map((stat) => stat.text())).toEqual(['0', '0', '0'])
    })

    it('removes its scroll trigger when it is unmounted', () => {
        const wrapper = mount(About)

        wrapper.unmount()

        expect(timeline.scrollTrigger.kill).toHaveBeenCalled()
    })

    it('does not animate when the player prefers reduced motion', () => {
        prefersReducedMotion()

        const wrapper = mount(About)
        wrapper.unmount()

        expect(gsap.timeline).not.toHaveBeenCalled()
    })
})
