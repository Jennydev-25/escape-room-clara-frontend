import GameView from '@/views/game/GameView.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { afterEach, describe, expect, it, vi } from 'vitest'

const listFolders = vi.fn().mockResolvedValue([{ getCode: () => 'tomas', getName: () => 'Tomás' }])
const getFolder = vi.fn().mockResolvedValue({ getPuzzles: () => [] })
const mountGameView = () => mount(GameView, { global: { plugins: [createPinia()], provide: { FolderService: { listFolders, getFolder } } } })

const supportFullscreen = () => Object.defineProperty(document, 'fullscreenEnabled', { value: true, configurable: true })
const enterFullscreen = () => Object.defineProperty(document, 'fullscreenElement', { value: document.documentElement, configurable: true })

describe('GameView', () => {

    afterEach(() => {
        delete document.fullscreenEnabled
        delete document.fullscreenElement
        delete document.exitFullscreen
        delete document.documentElement.requestFullscreen
    })

    it('shows the folders on the desktop', async () => {
        const wrapper = mountGameView()
        await flushPromises()

        expect(wrapper.get('main').text()).toContain('Tomás')
    })

    it('shows the ClaraOS desktop with the ClaraOS theme', () => {
        const wrapper = mountGameView()

        expect(wrapper.get('main').classes()).toContain('theme-clara-os')
        expect(wrapper.get('h1').text()).toBe('Escritorio de ClaraOS')
    })

    it('shows the welcome message in the taskbar', () => {
        const wrapper = mountGameView()

        expect(wrapper.get('footer').text()).toContain('ClaraOS · Bienvenida de nuevo, Clara')
    })

    it('shows a fullscreen button when the browser supports it', () => {
        supportFullscreen()

        const wrapper = mountGameView()

        expect(wrapper.find('button[aria-label="Pantalla completa"]').exists()).toBe(true)
    })

    it('hides the fullscreen button when the browser does not support it', () => {
        const wrapper = mountGameView()

        expect(wrapper.find('button[aria-label="Pantalla completa"]').exists()).toBe(false)
    })

    it('requests fullscreen when the button is clicked', async () => {
        supportFullscreen()
        document.documentElement.requestFullscreen = vi.fn()
        const wrapper = mountGameView()

        await wrapper.get('footer button').trigger('click')

        expect(document.documentElement.requestFullscreen).toHaveBeenCalledOnce()
    })

    it('exits fullscreen when the button is clicked while in fullscreen', async () => {
        supportFullscreen()
        enterFullscreen()
        document.exitFullscreen = vi.fn()
        const wrapper = mountGameView()

        await wrapper.get('footer button').trigger('click')

        expect(document.exitFullscreen).toHaveBeenCalledOnce()
    })

    it('shows the exit label when the browser enters fullscreen', async () => {
        supportFullscreen()
        const wrapper = mountGameView()

        enterFullscreen()
        document.dispatchEvent(new Event('fullscreenchange'))
        await flushPromises()

        expect(wrapper.find('button[aria-label="Salir de pantalla completa"]').exists()).toBe(true)
    })

    it('shows the enter label again when the browser leaves fullscreen', async () => {
        supportFullscreen()
        enterFullscreen()
        const wrapper = mountGameView()

        delete document.fullscreenElement
        document.dispatchEvent(new Event('fullscreenchange'))
        await flushPromises()

        expect(wrapper.find('button[aria-label="Pantalla completa"]').exists()).toBe(true)
    })

    it('shows the trash on the desktop', () => {
        const wrapper = mountGameView()

        const trash = wrapper.findAll('main button').find((button) => button.text() === 'Papelera')

        expect(trash).toBeDefined()
    })

})
