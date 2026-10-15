import FileViewer from '@/components/game/FileViewer.vue'
import TrashWindow from '@/components/game/TrashWindow.vue'
import BaseWindow from '@/shared/BaseWindow.vue'
import { useSeenStore } from '@/stores/seen'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { clickWith } from '../../helpers/clickWith.js'

const file = (name, body) => ({ getName: () => name, getBody: () => body })
const listDiscardedFiles = vi.fn()
const markSeen = vi.fn()

// rellena el store con las claves ya vistas del jugador, como haría GameView (null = aún sin cargar)
const mountTrashWindow = (seenKeys = null) => {
    const pinia = createPinia()
    setActivePinia(pinia)
    if (seenKeys) useSeenStore().setSeen(seenKeys)
    return mount(TrashWindow, { global: { plugins: [pinia], stubs: { FileViewer: true }, provide: { TrashService: { listDiscardedFiles }, SeenService: { markSeen } } } })
}

describe('TrashWindow', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        delete window.matchMedia
    })

    it('marks only the discarded files that have not been opened yet', async () => {
        listDiscardedFiles.mockResolvedValue([
            file('salgo_fatal.png', '/papelera/salgo_fatal.png'),
            file('ideas_sueltas.txt', '/papelera/ideas_sueltas.txt'),
        ])

        const wrapper = mountTrashWindow(['file:/papelera/salgo_fatal.png'])
        await flushPromises()
        const [seen, unseen] = wrapper.findAll('li button')

        expect(seen.text()).not.toContain('archivo nuevo')
        expect(unseen.text()).toContain('archivo nuevo')
    })

    it('marks a discarded file as seen when it is opened and removes its new mark', async () => {
        listDiscardedFiles.mockResolvedValue([file('ideas_sueltas.txt', '/papelera/ideas_sueltas.txt')])
        const wrapper = mountTrashWindow([])
        await flushPromises()

        await wrapper.get('li button').trigger('dblclick')

        expect(markSeen).toHaveBeenCalledWith('file:/papelera/ideas_sueltas.txt')
        expect(wrapper.get('li button').text()).not.toContain('archivo nuevo')
    })

    it('does not mark a discarded file again when it was already opened', async () => {
        listDiscardedFiles.mockResolvedValue([file('ideas_sueltas.txt', '/papelera/ideas_sueltas.txt')])
        const wrapper = mountTrashWindow(['file:/papelera/ideas_sueltas.txt'])
        await flushPromises()

        await wrapper.get('li button').trigger('dblclick')

        expect(markSeen).not.toHaveBeenCalled()
    })

    it('asks to be closed when the window is closed', async () => {
        listDiscardedFiles.mockResolvedValue([])
        const wrapper = mountTrashWindow()
        await flushPromises()

        await wrapper.findComponent(BaseWindow).vm.$emit('close')

        expect(wrapper.emitted('close')).toHaveLength(1)
    })

    it('closes the file viewer when it asks to be closed', async () => {
        listDiscardedFiles.mockResolvedValue([file('ideas_sueltas.txt', '/papelera/ideas_sueltas.txt')])
        const wrapper = mountTrashWindow()
        await flushPromises()
        await wrapper.get('li button').trigger('dblclick')

        await wrapper.findComponent(FileViewer).vm.$emit('close')

        expect(wrapper.findComponent(FileViewer).exists()).toBe(false)
    })

    it('shows a button for files with an unknown extension', async () => {
        listDiscardedFiles.mockResolvedValue([file('factura.pdf', '/papelera/factura.pdf')])

        const wrapper = mountTrashWindow()
        await flushPromises()

        expect(wrapper.get('li button').text()).toBe('factura.pdf')
    })

    it('shows Papelera as the title and a button for each discarded file with its original name', async () => {
        listDiscardedFiles.mockResolvedValue([
            file('borrador_reportaje_puerto_v1.txt', '/papelera/borrador_reportaje_puerto_v1.txt'),
            file('salgo_fatal.png', '/papelera/salgo_fatal.png'),
        ])

        const wrapper = mountTrashWindow()
        await flushPromises()

        expect(wrapper.get('h2').text()).toBe('Papelera')
        expect(wrapper.findAll('li button').map((button) => button.text())).toEqual([
            'borrador_reportaje_puerto_v1.txt',
            'salgo_fatal.png',
        ])
    })

    it('opens the file viewer with the file path when a file is double clicked', async () => {
        listDiscardedFiles.mockResolvedValue([file('ideas_sueltas.txt', '/papelera/ideas_sueltas.txt')])
        const wrapper = mountTrashWindow()
        await flushPromises()

        await wrapper.get('li button').trigger('dblclick')

        expect(wrapper.findComponent(FileViewer).props('path')).toBe('/papelera/ideas_sueltas.txt')
    })

    it.each([
        ['the keyboard', { detail: 0 }, false],
        ['a single tap on a touch screen', { detail: 1 }, true],
    ])('opens the file viewer when a file is activated with %s', async (_, clickOptions, isTouchScreen) => {
        if (isTouchScreen) {
            window.matchMedia = vi.fn().mockReturnValue({ matches: true })
        }
        listDiscardedFiles.mockResolvedValue([file('ideas_sueltas.txt', '/papelera/ideas_sueltas.txt')])
        const wrapper = mountTrashWindow()
        await flushPromises()

        await clickWith(wrapper.get('li button'), clickOptions)

        expect(wrapper.findComponent(FileViewer).props('path')).toBe('/papelera/ideas_sueltas.txt')
    })

})
