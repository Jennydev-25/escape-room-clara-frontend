import GameView from '@/views/game/GameView.vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

describe('GameView', () => {

    afterEach(() => {
        delete document.fullscreenEnabled
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

})
