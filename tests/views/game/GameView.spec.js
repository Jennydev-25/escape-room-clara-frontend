import GameView from '@/views/game/GameView.vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('GameView', () => {

    afterEach(() => {
        delete document.fullscreenEnabled
        delete document.fullscreenElement
        delete document.exitFullscreen
        delete document.documentElement.requestFullscreen
    })

    it('shows the ClaraOS desktop with the ClaraOS theme', () => {
        const wrapper = mount(GameView)

        expect(wrapper.get('main').classes()).toContain('theme-clara-os')
        expect(wrapper.get('h1').text()).toBe('Escritorio de ClaraOS')
    })

    it('shows the welcome message in the taskbar', () => {
        const wrapper = mount(GameView)

        expect(wrapper.get('footer').text()).toContain('ClaraOS · Bienvenida de nuevo, Clara')
    })

    it('shows a fullscreen button when the browser supports it', () => {
        Object.defineProperty(document, 'fullscreenEnabled', { value: true, configurable: true })

        const wrapper = mount(GameView)

        expect(wrapper.find('button[aria-label="Pantalla completa"]').exists()).toBe(true)
    })

    it('hides the fullscreen button when the browser does not support it', () => {
        const wrapper = mount(GameView)

        expect(wrapper.find('button[aria-label="Pantalla completa"]').exists()).toBe(false)
    })

    it('requests fullscreen when the button is clicked', async () => {
        Object.defineProperty(document, 'fullscreenEnabled', { value: true, configurable: true })
        document.documentElement.requestFullscreen = vi.fn()
        const wrapper = mount(GameView)

        await wrapper.get('footer button').trigger('click')

        expect(document.documentElement.requestFullscreen).toHaveBeenCalledOnce()
    })

    it('exits fullscreen when the button is clicked while in fullscreen', async () => {
        Object.defineProperty(document, 'fullscreenEnabled', { value: true, configurable: true })
        Object.defineProperty(document, 'fullscreenElement', { value: document.documentElement, configurable: true })
        document.exitFullscreen = vi.fn()
        const wrapper = mount(GameView)

        await wrapper.get('footer button').trigger('click')

        expect(document.exitFullscreen).toHaveBeenCalledOnce()
    })

})
