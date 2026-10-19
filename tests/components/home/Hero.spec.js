import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { gsap } from 'gsap'
import Hero from '@/components/home/Hero.vue'
import AccessPanel from '@/components/home/AccessPanel.vue'

const originalMatchMedia = window.matchMedia
let timelines

function createTimeline(vars) {
    const timeline = {
        vars,
        to: vi.fn().mockReturnThis(),
        from: vi.fn().mockReturnThis(),
        kill: vi.fn(),
        scrollTrigger: { kill: vi.fn() },
    }
    timelines.push(timeline)
    return timeline
}

const mountHero = () => mount(Hero, { global: { stubs: { AccessPanel: true } } })
const parallaxTimeline = () => timelines.find((timeline) => timeline.vars?.scrollTrigger)
const flickerTimeline = () => timelines.find((timeline) => timeline.vars?.onComplete)

function prefersReducedMotion() {
    window.matchMedia = vi.fn().mockImplementation((query) => ({ matches: true, media: query }))
}

function imageLoaded(loaded) {
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(loaded)
}

function heroImageBox(width, height) {
    return vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ width, height })
}

describe('Hero', () => {
    beforeEach(() => {
        timelines = []
        imageLoaded(true)
        vi.spyOn(gsap, 'timeline').mockImplementation(createTimeline)
        vi.spyOn(gsap, 'delayedCall').mockImplementation((delay, callback) => ({ delay, callback, kill: vi.fn() }))
    })

    afterEach(() => {
        window.matchMedia = originalMatchMedia
        vi.restoreAllMocks()
    })

    it('shows the title, the tagline and the investigate button', () => {
        const wrapper = mountHero()

        expect(wrapper.get('h1').text()).toContain('El último archivo de Clara')
        expect(wrapper.get('.hero__tagline').text()).toContain('alguien tiene que terminarlo')
        expect(wrapper.get('.hero__cta').text()).toBe('Investigar')
    })

    it('places the lamp glow over the lamp of the image', () => {
        heroImageBox(839, 468.5)

        const wrapper = mountHero()
        const glow = wrapper.get('.hero__lamp-glow').element

        expect(glow.style.left).toBe('254px')
        expect(glow.style.top).toBe('94px')
    })

    it('moves the lamp glow when the window is resized', () => {
        const box = heroImageBox(1678, 937)
        const wrapper = mountHero()
        box.mockReturnValue({ width: 839, height: 468.5 })

        window.dispatchEvent(new Event('resize'))

        expect(wrapper.get('.hero__lamp-glow').element.style.left).toBe('254px')
    })

    it('types the title and shows the tagline and the button when the image is loaded', () => {
        const wrapper = mountHero()

        const intro = timelines[0]
        expect(intro.vars).toEqual({ delay: 0.4 })
        expect(intro.to).toHaveBeenCalledWith(
            wrapper.get('.hero__title [aria-hidden="true"]').element,
            expect.objectContaining({ text: 'El último archivo de Clara' }),
        )
        expect(intro.from).toHaveBeenCalledTimes(2)
    })

    it('waits for the image to load before starting the intro', () => {
        imageLoaded(false)
        const wrapper = mountHero()
        const introStarted = () => gsap.timeline.mock.calls.some(([options]) => options?.delay === 0.4)

        expect(introStarted()).toBe(false)

        wrapper.get('.hero__bg').element.dispatchEvent(new Event('load'))

        expect(introStarted()).toBe(true)
    })

    it('shows the whole title without animations when the player prefers reduced motion', () => {
        prefersReducedMotion()

        const wrapper = mountHero()
        wrapper.unmount()

        expect(gsap.timeline).not.toHaveBeenCalled()
    })

    it('writes the title at once when the player prefers reduced motion', () => {
        prefersReducedMotion()

        const wrapper = mountHero()

        expect(wrapper.get('.hero__title [aria-hidden="true"]').text()).toBe('El último archivo de Clara')
    })

    it.each([
        [0, 4],
        [1, 2],
        [2, 3],
        [3, 4],
    ])('flickers the lamp with pattern %i in %i steps', (pattern, steps) => {
        vi.spyOn(gsap.utils, 'random').mockImplementation((choices) => (Array.isArray(choices) ? choices[pattern] : 1.5))

        mountHero()

        expect(flickerTimeline().to).toHaveBeenCalledTimes(steps)
    })

    it('schedules the next flicker when one ends', () => {
        vi.spyOn(gsap.utils, 'random').mockImplementation((choices) => (Array.isArray(choices) ? choices[0] : 1.5))
        mountHero()
        const flickersBefore = timelines.filter((timeline) => timeline.vars?.onComplete).length

        flickerTimeline().vars.onComplete()
        const next = gsap.delayedCall.mock.results[0].value
        next.callback()

        expect(gsap.delayedCall).toHaveBeenCalledWith(1.5, expect.any(Function))
        expect(timelines.filter((timeline) => timeline.vars?.onComplete)).toHaveLength(flickersBefore + 1)
    })

    it('stops flickering and removes the scroll trigger when it is unmounted', () => {
        vi.spyOn(gsap.utils, 'random').mockImplementation((choices) => (Array.isArray(choices) ? choices[0] : 1.5))
        const wrapper = mountHero()
        const flicker = flickerTimeline()
        flicker.vars.onComplete()
        const next = gsap.delayedCall.mock.results[0].value
        const parallax = parallaxTimeline()

        wrapper.unmount()
        const timelinesBefore = timelines.length
        next.callback()

        expect(next.kill).toHaveBeenCalled()
        expect(parallax.scrollTrigger.kill).toHaveBeenCalled()
        expect(timelines).toHaveLength(timelinesBefore)
    })

    it('moves the content and the background while the page scrolls', () => {
        const wrapper = mountHero()

        const parallax = parallaxTimeline()

        expect(parallax.vars.scrollTrigger).toEqual(expect.objectContaining({
            trigger: wrapper.element,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        }))
        expect(parallax.to).toHaveBeenCalledTimes(2)
    })

    it('keeps the lamp glow in place while the page scrolls', () => {
        const box = heroImageBox(1678, 937)
        const wrapper = mountHero()
        box.mockReturnValue({ width: 839, height: 468.5 })

        parallaxTimeline().vars.scrollTrigger.onUpdate()

        expect(wrapper.get('.hero__lamp-glow').element.style.left).toBe('254px')
    })

    it('ignores a scroll update that arrives after it is unmounted', () => {
        const wrapper = mountHero()
        const { onUpdate } = parallaxTimeline().vars.scrollTrigger

        wrapper.unmount()

        expect(() => onUpdate()).not.toThrow()
    })

    it('opens the access panel in the register tab when Investigar is clicked', async () => {
        const wrapper = mountHero()

        await wrapper.get('.hero__cta').trigger('click')

        const panel = wrapper.findComponent(AccessPanel)
        expect(panel.props('open')).toBe(true)
        expect(panel.props('tab')).toBe('register')
        expect(wrapper.classes()).toContain('lg:pr-120')
    })

    it('lets the parent open the access panel in the tab it asks for', async () => {
        const wrapper = mountHero()

        wrapper.vm.openPanel('login')
        await wrapper.vm.$nextTick()

        const panel = wrapper.findComponent(AccessPanel)
        expect(panel.props('open')).toBe(true)
        expect(panel.props('tab')).toBe('login')
    })

    it('closes the access panel and changes its tab when the panel asks for it', async () => {
        const wrapper = mountHero()
        await wrapper.get('.hero__cta').trigger('click')
        const panel = wrapper.findComponent(AccessPanel)

        panel.vm.$emit('update:tab', 'login')
        panel.vm.$emit('update:open', false)
        await wrapper.vm.$nextTick()

        expect(panel.props('tab')).toBe('login')
        expect(panel.props('open')).toBe(false)
        expect(wrapper.classes()).not.toContain('lg:pr-120')
    })
})
