import FileViewer from '@/components/game/FileViewer.vue'
import FolderWindow from '@/components/game/FolderWindow.vue'
import { useSeenStore } from '@/stores/seen'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { clickWith } from '../../helpers/clickWith.js'

const puzzle = (id) => ({ getId: () => id })
const puzzleWithFiles = (...files) => ({ getFiles: () => files })
const getFolder = vi.fn()
const getPuzzle = vi.fn()
const markSeen = vi.fn()

// rellena el store con las claves ya vistas del jugador, como haría GameView (null = aún sin cargar)
const mountFolderWindow = (seenKeys = null) => {
    const pinia = createPinia()
    setActivePinia(pinia)
    if (seenKeys) useSeenStore().setSeen(seenKeys)
    return mount(FolderWindow, {
        props: { code: 'tomas' },
        global: { plugins: [pinia], stubs: { FileViewer: true }, provide: { FolderService: { getFolder }, PuzzleService: { getPuzzle }, SeenService: { markSeen } } },
    })
}

const withOneFile = () => {
    getFolder.mockResolvedValue({ getName: () => 'Léeme', getPuzzles: () => [puzzle(1)] })
    getPuzzle.mockResolvedValue(puzzleWithFiles('/leeme/leeme.txt'))
}

describe('FolderWindow', () => {

    afterEach(() => {
        delete window.matchMedia
    })

    it('marks only the files that have not been opened yet', async () => {
        getFolder.mockResolvedValue({ getName: () => 'Tomás', getPuzzles: () => [puzzle(2)] })
        getPuzzle.mockResolvedValue(puzzleWithFiles('/tomas/tomas_elorza.png', '/tomas/libreta_tomas.png'))

        const wrapper = mountFolderWindow(['file:/tomas/tomas_elorza.png'])
        await flushPromises()
        const [seen, unseen] = wrapper.findAll('li button')

        expect(seen.text()).not.toContain('archivo nuevo')
        expect(unseen.text()).toContain('archivo nuevo')
    })

    it('marks a file as seen when it is opened and removes its new mark', async () => {
        withOneFile()
        const wrapper = mountFolderWindow([])
        await flushPromises()

        await wrapper.get('li button').trigger('dblclick')

        expect(markSeen).toHaveBeenCalledWith('file:/leeme/leeme.txt')
        expect(wrapper.get('li button').text()).not.toContain('archivo nuevo')
    })

    it('shows the folder name as the title and a button for each file with its original name', async () => {
        getFolder.mockResolvedValue({ getName: () => 'Tomás', getPuzzles: () => [puzzle(2), puzzle(3)] })
        getPuzzle.mockImplementation(async (id) => id === 2
            ? puzzleWithFiles('/tomas/tomas_elorza.png', '/tomas/libreta_tomas.png')
            : puzzleWithFiles('/tomas/conciliacion_proveedores_2002-2005.pdf'))

        const wrapper = mountFolderWindow()
        await flushPromises()

        expect(getFolder).toHaveBeenCalledWith('tomas')
        expect(wrapper.get('h2').text()).toBe('Tomás')
        expect(wrapper.findAll('li button').map((button) => button.text())).toEqual([
            'tomas_elorza.png',
            'libreta_tomas.png',
            'conciliacion_proveedores_2002-2005.pdf',
        ])
    })

    it('opens the file viewer when a file is double clicked', async () => {
        withOneFile()
        const wrapper = mountFolderWindow()
        await flushPromises()

        await wrapper.get('li button').trigger('dblclick')

        expect(wrapper.findComponent(FileViewer).props('path')).toBe('/leeme/leeme.txt')
    })

    it('does not open the file with a single mouse click', async () => {
        withOneFile()
        const wrapper = mountFolderWindow()
        await flushPromises()

        await clickWith(wrapper.get('li button'), { detail: 1 })

        expect(wrapper.findComponent(FileViewer).exists()).toBe(false)
    })

    it('opens the file when it is activated with the keyboard', async () => {
        withOneFile()
        const wrapper = mountFolderWindow()
        await flushPromises()

        await clickWith(wrapper.get('li button'), { detail: 0 })

        expect(wrapper.findComponent(FileViewer).props('path')).toBe('/leeme/leeme.txt')
    })

    it('opens the file with a single tap on touch screens', async () => {
        window.matchMedia = vi.fn().mockReturnValue({ matches: true })
        withOneFile()
        const wrapper = mountFolderWindow()
        await flushPromises()

        await clickWith(wrapper.get('li button'), { detail: 1 })

        expect(wrapper.findComponent(FileViewer).props('path')).toBe('/leeme/leeme.txt')
    })

    it('closes the file viewer when it asks to be closed', async () => {
        withOneFile()
        const wrapper = mountFolderWindow()
        await flushPromises()
        await wrapper.get('li button').trigger('dblclick')

        await wrapper.findComponent(FileViewer).vm.$emit('close')

        expect(wrapper.findComponent(FileViewer).exists()).toBe(false)
    })

})
