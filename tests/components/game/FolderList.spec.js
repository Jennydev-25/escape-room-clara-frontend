import FolderList from '@/components/game/FolderList.vue'
import FolderWindow from '@/components/game/FolderWindow.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { clickWith } from '../../helpers/clickWith.js'

const listFolders = vi.fn()
const getFolder = vi.fn()
const getPuzzle = vi.fn()
const mountFolderList = () => mount(FolderList, { global: { plugins: [createPinia()], provide: { FolderService: { listFolders, getFolder }, PuzzleService: { getPuzzle } } } })

const folder = (code, name) => ({ getCode: () => code, getName: () => name })
const folderWithPuzzles = (...ids) => ({ getName: () => 'Tomás', getPuzzles: () => ids.map((id) => ({ getId: () => id })) })

describe('FolderList', () => {

    beforeEach(() => {
        listFolders.mockReset()
        getFolder.mockReset()
        getFolder.mockResolvedValue(folderWithPuzzles())
        getPuzzle.mockReset()
        getPuzzle.mockResolvedValue({ getFiles: () => [] })
        localStorage.clear()
    })

    afterEach(() => {
        delete window.matchMedia
    })

    it('shows a button for each folder returned by the service', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás'), folder('fraude', 'Fraude')])

        const wrapper = mountFolderList()
        await flushPromises()

        const buttons = wrapper.findAll('button')

        expect(buttons).toHaveLength(2)
        expect(buttons[0].text()).toContain('Tomás')
        expect(buttons[1].text()).toContain('Fraude')
    })

    it('marks as new only the folders that have not been opened yet', async () => {
        localStorage.setItem('seen', JSON.stringify(['folder:fraude']))
        listFolders.mockResolvedValue([folder('tomas', 'Tomás'), folder('fraude', 'Fraude')])

        const wrapper = mountFolderList()
        await flushPromises()
        const [tomas, fraude] = wrapper.findAll('button')

        expect(tomas.text()).toContain('con contenido nuevo')
        expect(fraude.text()).not.toContain('con contenido nuevo')
    })

    it('removes the new mark and remembers the folder when it is opened', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = mountFolderList()
        await flushPromises()

        await wrapper.get('button').trigger('click')

        expect(wrapper.get('button').text()).not.toContain('con contenido nuevo')
        expect(JSON.parse(localStorage.getItem('seen'))).toContain('folder:tomas')
    })

    it('marks an opened folder when it has files the player does not know yet', async () => {
        localStorage.setItem('seen', JSON.stringify(['folder:tomas', 'known:1']))
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        getFolder.mockResolvedValue(folderWithPuzzles(1, 2))

        const wrapper = mountFolderList()
        await flushPromises()

        expect(wrapper.get('button').text()).toContain('con archivos nuevos')
    })

    it('does not mark an opened folder when all its files are known', async () => {
        localStorage.setItem('seen', JSON.stringify(['folder:tomas', 'known:1', 'known:2']))
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        getFolder.mockResolvedValue(folderWithPuzzles(1, 2))

        const wrapper = mountFolderList()
        await flushPromises()

        expect(wrapper.get('button').text()).not.toContain('nuevo')
    })

    it('remembers the files of a folder when it is opened', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        getFolder.mockResolvedValue(folderWithPuzzles(1, 2))
        const wrapper = mountFolderList()
        await flushPromises()

        await wrapper.get('button').trigger('click')

        expect(JSON.parse(localStorage.getItem('seen'))).toEqual(expect.arrayContaining(['known:1', 'known:2']))
    })

    it('shows an error message when the folders cannot be loaded', async () => {
        listFolders.mockRejectedValue(new Error('¡Ups! Algo salió mal'))

        const wrapper = mountFolderList()
        await flushPromises()

        expect(wrapper.get('[role="alert"]').text()).toContain('¡Ups! Algo salió mal')
        expect(wrapper.findAll('button')).toHaveLength(0)
    })

    it('opens the window of a folder when it is clicked', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = mountFolderList()
        await flushPromises()

        await wrapper.get('button').trigger('click')

        expect(wrapper.findComponent(FolderWindow).props('code')).toBe('tomas')
    })

    it('closes the folder window when it asks to be closed', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = mountFolderList()
        await flushPromises()
        await wrapper.get('button').trigger('click')

        await wrapper.findComponent(FolderWindow).vm.$emit('close')

        expect(wrapper.findComponent(FolderWindow).exists()).toBe(false)
    })

    it('does not open a folder with a single mouse click', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = mountFolderList()
        await flushPromises()

        await clickWith(wrapper.get('button'), { detail: 1 })

        expect(wrapper.findComponent(FolderWindow).exists()).toBe(false)
        expect(localStorage.getItem('seen')).toBeNull()
    })

    it('opens a folder with a double click', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = mountFolderList()
        await flushPromises()

        await wrapper.get('button').trigger('dblclick')

        expect(wrapper.findComponent(FolderWindow).props('code')).toBe('tomas')
    })

    it('opens a folder with a single tap on touch screens', async () => {
        window.matchMedia = vi.fn().mockReturnValue({ matches: true })
        listFolders.mockResolvedValue([folder('tomas', 'Tomás')])
        const wrapper = mountFolderList()
        await flushPromises()

        await clickWith(wrapper.get('button'), { detail: 1 })

        expect(wrapper.findComponent(FolderWindow).props('code')).toBe('tomas')
    })

})
