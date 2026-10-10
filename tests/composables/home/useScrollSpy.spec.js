import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useScrollSpy } from '@/composables/home/useScrollSpy'

let observerCallback = null
let observerOptions = null

class IntersectionObserverMock {
    constructor(callback, options) {
        observerCallback = callback
        observerOptions = options
    }
    observe() {}
    disconnect() {}
}

function mountScrollSpy(sectionIds) {
    const TestComponent = defineComponent({
        setup() {
            return useScrollSpy(sectionIds)
        },
        template: '<div></div>',
    })
    return mount(TestComponent)
}

describe('useScrollSpy', () => {
    beforeEach(() => {
        observerCallback = null
        observerOptions = null
        window.IntersectionObserver = IntersectionObserverMock
        document.body.innerHTML = `
            <section id="el-caso"></section>
            <section id="sobre-el-juego"></section>
            <section id="contacto"></section>
        `
    })

    afterEach(() => {
        document.body.innerHTML = ''
    })

    it('starts with no active section', () => {
        const wrapper = mountScrollSpy(['el-caso', 'sobre-el-juego', 'contacto'])

        expect(wrapper.vm.activeId).toBe(null)
    })

    it('sets the active section id when it intersects the viewport band', async () => {
        const wrapper = mountScrollSpy(['el-caso', 'sobre-el-juego', 'contacto'])
        const contactoEl = document.getElementById('contacto')

        observerCallback([{ isIntersecting: true, target: contactoEl }])
        await nextTick()

        expect(wrapper.vm.activeId).toBe('contacto')
    })

    it('observes the sections using a rootMargin centered on the viewport', () => {
        mountScrollSpy(['el-caso', 'sobre-el-juego', 'contacto'])

        expect(observerOptions).toEqual({ rootMargin: '-40% 0px -40% 0px' })
    })
})
