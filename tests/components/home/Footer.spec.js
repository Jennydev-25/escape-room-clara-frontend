import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { gsap } from 'gsap'
import Footer from '@/components/home/Footer.vue'

const originalMatchMedia = window.matchMedia
let timeline

function prefersReducedMotion() {
    window.matchMedia = vi.fn().mockImplementation((query) => ({ matches: true, media: query }))
}

describe('Footer', () => {
    beforeEach(() => {
        timeline = { from: vi.fn().mockReturnThis(), scrollTrigger: { kill: vi.fn() } }
        vi.spyOn(gsap, 'timeline').mockReturnValue(timeline)
    })

    afterEach(() => {
        window.matchMedia = originalMatchMedia
        vi.restoreAllMocks()
    })

    it('shows the name of the game and the author link', () => {
        const wrapper = mount(Footer)

        expect(wrapper.get('.footer__name').text()).toBe('El último archivo de Clara')
        expect(wrapper.get('.footer__github').attributes('href')).toBe('https://github.com/Jennydev-25')
    })

    it('fades the bar in when the footer scrolls into view', () => {
        const wrapper = mount(Footer)

        const [options] = gsap.timeline.mock.calls[0]
        expect(options.scrollTrigger.trigger).toBe(wrapper.element)
        expect(timeline.from).toHaveBeenCalledTimes(1)
    })

    it('removes its scroll trigger when it is unmounted', () => {
        const wrapper = mount(Footer)

        wrapper.unmount()

        expect(timeline.scrollTrigger.kill).toHaveBeenCalled()
    })

    it('does not animate when the player prefers reduced motion', () => {
        prefersReducedMotion()

        const wrapper = mount(Footer)
        wrapper.unmount()

        expect(gsap.timeline).not.toHaveBeenCalled()
    })
})
