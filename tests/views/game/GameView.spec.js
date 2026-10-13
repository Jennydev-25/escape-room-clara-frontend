import PuzzleWindow from '@/components/game/PuzzleWindow.vue'
import TrashWindow from '@/components/game/TrashWindow.vue'
import router from '@/router'
import LoadingScreen from '@/shared/LoadingScreen.vue'
import GameView from '@/views/game/GameView.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { afterEach, describe, expect, it, vi } from 'vitest'

const listFolders = vi.fn().mockResolvedValue([{ getCode: () => 'tomas', getName: () => 'Tomás' }])
const getFolder = vi.fn().mockResolvedValue({ getPuzzles: () => [] })
const getProgress = vi.fn().mockResolvedValue({ getCurrentChapter: () => 1 })
const getPuzzle = vi.fn().mockResolvedValue({ getMinChapter: () => 1, getQuestion: () => null })
const listDiscardedFiles = vi.fn().mockResolvedValue([])
const mountGameView = (services = {}) => mount(GameView, {
    global: {
        plugins: [createPinia(), router],
        provide: { FolderService: { listFolders, getFolder }, ProgressService: { getProgress }, PuzzleService: { getPuzzle }, TrashService: { listDiscardedFiles }, ...services },
    },
})

const supportFullscreen = () => Object.defineProperty(document, 'fullscreenEnabled', { value: true, configurable: true })
const enterFullscreen = () => Object.defineProperty(document, 'fullscreenElement', { value: document.documentElement, configurable: true })

describe('GameView', () => {

    afterEach(() => {
        delete document.fullscreenEnabled
        delete document.fullscreenElement
        delete document.exitFullscreen
        delete document.documentElement.requestFullscreen
        delete window.matchMedia
        vi.useRealTimers()
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

    it('shows the next chapter button in the taskbar', () => {
        const wrapper = mountGameView()

        expect(wrapper.get('footer').get('button[aria-label="Siguiente capítulo"]').exists()).toBe(true)
    })

    it('opens the puzzle of the current chapter when the next chapter button is clicked', async () => {
        const wrapper = mountGameView({
            FolderService: {
                listFolders: vi.fn().mockResolvedValue([{ getCode: () => 'leeme', getName: () => 'Léeme' }]),
                getFolder: vi.fn().mockResolvedValue({ getPuzzles: () => [{ getId: () => 1, getTitle: () => 'Capítulo 1: La desaparición' }] }),
            },
            PuzzleService: { getPuzzle: vi.fn().mockResolvedValue({ getMinChapter: () => 1, getQuestion: () => 'Según la nota, ¿en qué no debes confiar nunca?' }) },
        })
        await flushPromises()

        await wrapper.get('button[aria-label="Siguiente capítulo"]').trigger('click')
        await flushPromises()

        expect(wrapper.getComponent(PuzzleWindow).props()).toEqual({
            id: 1,
            title: 'Capítulo 1: La desaparición',
            question: 'Según la nota, ¿en qué no debes confiar nunca?',
        })
    })

    it('shows a coming soon notice when there is no puzzle for the current chapter', async () => {
        const wrapper = mountGameView()
        await flushPromises()

        await wrapper.get('button[aria-label="Siguiente capítulo"]').trigger('click')
        await flushPromises()

        expect(wrapper.get('[role="alert"]').text()).toBe('Próximamente...')
    })

    it('hides the coming soon notice when it is dismissed', async () => {
        const wrapper = mountGameView()
        await flushPromises()
        await wrapper.get('button[aria-label="Siguiente capítulo"]').trigger('click')
        await flushPromises()

        await wrapper.get('[role="alert"] button[aria-label="Cerrar aviso"]').trigger('click')

        expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    })

    it('closes the puzzle and reloads the folders when it is solved', async () => {
        const leeme = { getCode: () => 'leeme', getName: () => 'Léeme' }
        const tomas = { getCode: () => 'tomas', getName: () => 'Tomás' }
        const wrapper = mountGameView({
            FolderService: {
                listFolders: vi.fn().mockResolvedValueOnce([leeme]).mockResolvedValueOnce([leeme]).mockResolvedValue([leeme, tomas]),
                getFolder: vi.fn().mockResolvedValue({ getPuzzles: () => [{ getId: () => 1, getTitle: () => 'Capítulo 1: La desaparición' }] }),
            },
            PuzzleService: { getPuzzle: vi.fn().mockResolvedValue({ getMinChapter: () => 1, getQuestion: () => 'Según la nota, ¿en qué no debes confiar nunca?' }) },
        })
        await flushPromises()
        await wrapper.get('button[aria-label="Siguiente capítulo"]').trigger('click')
        await flushPromises()
        expect(wrapper.get('main').text()).not.toContain('Tomás')

        wrapper.getComponent(PuzzleWindow).vm.$emit('solved')
        await flushPromises()

        expect(wrapper.findComponent(PuzzleWindow).exists()).toBe(false)
        expect(wrapper.get('main').text()).toContain('Tomás')
    })

    it('opens the trash window when the trash is double clicked', async () => {
        const wrapper = mountGameView()
        await flushPromises()
        const trash = wrapper.findAll('main button').find((button) => button.text() === 'Papelera')

        await trash.trigger('dblclick')

        expect(wrapper.findComponent(TrashWindow).exists()).toBe(true)
    })

    it.each([
        ['the keyboard', { detail: 0 }, false],
        ['a single tap on a touch screen', { detail: 1 }, true],
    ])('opens the trash window when the trash is activated with %s', async (_, clickOptions, isTouchScreen) => {
        if (isTouchScreen) {
            window.matchMedia = vi.fn().mockReturnValue({ matches: true })
        }
        const wrapper = mountGameView()
        await flushPromises()
        const trash = wrapper.findAll('main button').find((button) => button.text() === 'Papelera')

        await trash.trigger('click', clickOptions)

        expect(wrapper.findComponent(TrashWindow).exists()).toBe(true)
    })

    it('shows the current time in 24 hour format at the top right', () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date(2026, 9, 13, 14, 35))

        const wrapper = mountGameView()

        expect(wrapper.get('main time').text()).toBe('14:35')
    })

    it('updates the clock as the minutes go by', async () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date(2026, 9, 13, 14, 35))
        const wrapper = mountGameView()

        await vi.advanceTimersByTimeAsync(60000)

        expect(wrapper.get('main time').text()).toBe('14:36')
    })

    it('shows the exit ClaraOS button next to the clock', () => {
        const wrapper = mountGameView()

        const exit = wrapper.findAll('main button').find((button) => button.text() === 'Salir de ClaraOS')

        expect(exit).toBeDefined()
    })

    it('shows the loading screen with Volviendo... when leaving ClaraOS', async () => {
        const wrapper = mountGameView()
        const exit = wrapper.findAll('main button').find((button) => button.text() === 'Salir de ClaraOS')

        await exit.trigger('click')

        expect(wrapper.getComponent(LoadingScreen).props('title')).toBe('Volviendo...')
    })

})
