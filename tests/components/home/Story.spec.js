import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { gsap } from 'gsap'
import Story from '@/components/home/Story.vue'

const originalMatchMedia = window.matchMedia
let timeline

function prefersReducedMotion() {
    window.matchMedia = vi.fn().mockImplementation((query) => ({ matches: true, media: query }))
}

describe('Story', () => {
    beforeEach(() => {
        timeline = { from: vi.fn().mockReturnThis(), scrollTrigger: { kill: vi.fn() } }
        vi.spyOn(gsap, 'timeline').mockReturnValue(timeline)
    })

    afterEach(() => {
        window.matchMedia = originalMatchMedia
        vi.restoreAllMocks()
    })

    it('tells the story of the case', () => {
        const wrapper = mount(Story)

        expect(wrapper.get('#el-caso').exists()).toBe(true)
        expect(wrapper.get('.story__question').text()).toBe('¿Descubrirás la verdad?')
    })

    it('reveals the text and the three photos one after another', () => {
        const wrapper = mount(Story)

        const [options] = gsap.timeline.mock.calls[0]
        expect(options.scrollTrigger.trigger).toBe(wrapper.element)
        expect(timeline.from).toHaveBeenCalledTimes(4)
        expect(timeline.from.mock.calls[0][0]).toHaveLength(wrapper.findAll('.story__reveal').length)
    })

    it('removes its scroll trigger when it is unmounted', () => {
        const wrapper = mount(Story)

        wrapper.unmount()

        expect(timeline.scrollTrigger.kill).toHaveBeenCalled()
    })

    it('does not animate when the player prefers reduced motion', () => {
        prefersReducedMotion()

        const wrapper = mount(Story)
        wrapper.unmount()

        expect(gsap.timeline).not.toHaveBeenCalled()
    })
})
