import FolderList from '@/components/game/FolderList.vue'
import FolderWindow from '@/components/game/FolderWindow.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSeenStore } from '@/stores/seen'
import { clickWith } from '../../helpers/clickWith.js'

const listFolders = vi.fn()
const getFolder = vi.fn()
const getPuzzle = vi.fn()
const markSeen = vi.fn()

// carga el store con las claves ya vistas del jugador, como haría GameView
const mountFolderList = async (seenKeys = []) => {
    const pinia = createPinia()
    setActivePinia(pinia)
    await useSeenStore().load({
        listSeen: () => Promise.resolve(seenKeys.map((key) => ({ getKey: () => key }))),
        markSeen
    })
    return mount(FolderList, { global: { plugins: [pinia], provide: { FolderService: { listFolders, getFolder }, PuzzleService: { getPuzzle } } } })
}

const folder = (code, name) => ({ getCode: () => code, getName: () => name })
const folderWithPuzzles = (...ids) => ({ getName: () => 'Tomás', getPuzzles: () => ids.map((id) => ({ getId: () => id })) })

describe('FolderList', () => {

    beforeEach(() => {
        listFolders.mockReset()
        getFolder.mockReset()
        getFolder.mockResolvedValue(folderWithPuzzles())
        getPuzzle.mockReset()
        getPuzzle.mockResolvedValue({ getFiles: () => [] })
        markSeen.mockReset()
    })

    afterEach(() => {
        delete window.matchMedia
    })

    it('shows a button for each folder returned by the service', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás'), folder('fraude', 'Fraude')])

        const wrapper = await mountFolderList()
        await flushPromises()

        const buttons = wrapper.findAll('button')

        expect(buttons).toHaveLength(2)
        expect(buttons[0].text()).toContain('Tomás')
        expect(buttons[1].text()).toContain('Fraude')
    })

    it('marks as new only the folders that have not been opened yet', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás'), folder('fraude', 'Fraude')])

        const wrapper = await mountFolderList(['folder:fraude'])
        await flushPromises()
        const [tomas, fraude] = wrapper.findAll('button')

        expect(tomas.text()).toContain('con contenido nuevo')
        expect(fraude.text()).not.toContain('con contenido nuevo')
    })

    it('removes the new mark and remembers the folder when it is opened', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = await mountFolderList()
        await flushPromises()

        await wrapper.get('button').trigger('click')

        expect(wrapper.get('button').text()).not.toContain('con contenido nuevo')
        expect(markSeen).toHaveBeenCalledWith('folder:tomas')
    })

    it('marks an opened folder when it has files the player does not know yet', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        getFolder.mockResolvedValue(folderWithPuzzles(1, 2))

        const wrapper = await mountFolderList(['folder:tomas', 'known:1'])
        await flushPromises()

        expect(wrapper.get('button').text()).toContain('con archivos nuevos')
    })

    it('does not mark an opened folder when all its files are known', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        getFolder.mockResolvedValue(folderWithPuzzles(1, 2))

        const wrapper = await mountFolderList(['folder:tomas', 'known:1', 'known:2'])
        await flushPromises()

        expect(wrapper.get('button').text()).not.toContain('nuevo')
    })

    it('remembers the files of a folder when it is opened', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        getFolder.mockResolvedValue(folderWithPuzzles(1, 2))
        const wrapper = await mountFolderList()
        await flushPromises()

        await wrapper.get('button').trigger('click')

        expect(markSeen).toHaveBeenCalledWith('known:1')
        expect(markSeen).toHaveBeenCalledWith('known:2')
    })

    it('shows an error message when the folders cannot be loaded', async () => {
        listFolders.mockRejectedValue(new Error('¡Ups! Algo salió mal'))

        const wrapper = await mountFolderList()
        await flushPromises()

        expect(wrapper.get('[role="alert"]').text()).toContain('¡Ups! Algo salió mal')
        expect(wrapper.findAll('button')).toHaveLength(0)
    })

    it('opens the window of a folder when it is clicked', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = await mountFolderList()
        await flushPromises()

        await wrapper.get('button').trigger('click')

        expect(wrapper.findComponent(FolderWindow).props('code')).toBe('tomas')
    })

    it('closes the folder window when it asks to be closed', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = await mountFolderList()
        await flushPromises()
        await wrapper.get('button').trigger('click')

        await wrapper.findComponent(FolderWindow).vm.$emit('close')

        expect(wrapper.findComponent(FolderWindow).exists()).toBe(false)
    })

    it('does not open a folder with a single mouse click', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = await mountFolderList()
        await flushPromises()

        await clickWith(wrapper.get('button'), { detail: 1 })

        expect(wrapper.findComponent(FolderWindow).exists()).toBe(false)
        expect(markSeen).not.toHaveBeenCalled()
    })

    it('opens a folder with a double click', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = await mountFolderList()
        await flushPromises()

        await wrapper.get('button').trigger('dblclick')

        expect(wrapper.findComponent(FolderWindow).props('code')).toBe('tomas')
    })

    it('opens a folder with a single tap on touch screens', async () => {
        window.matchMedia = vi.fn().mockReturnValue({ matches: true })
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = await mountFolderList()
        await flushPromises()

        await clickWith(wrapper.get('button'), { detail: 1 })

        expect(wrapper.findComponent(FolderWindow).props('code')).toBe('tomas')
    })

})
