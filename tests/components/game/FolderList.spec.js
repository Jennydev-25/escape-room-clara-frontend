import FolderList from '@/components/game/FolderList.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const listFolders = vi.fn()
const mountFolderList = () => mount(FolderList, { global: { plugins: [createPinia()], provide: { FolderService: { listFolders } } } })

const folder = (code, name) => ({ getCode: () => code, getName: () => name })

describe('FolderList', () => {

    beforeEach(() => {
        listFolders.mockReset()
        localStorage.clear()
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

})
