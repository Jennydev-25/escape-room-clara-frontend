import FolderList from '@/components/game/FolderList.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const listFolders = vi.fn()
const withFolderService = { global: { provide: { FolderService: { listFolders } } } }

const folder = (code, name) => ({ getCode: () => code, getName: () => name })

describe('FolderList', () => {

    beforeEach(() => {
        listFolders.mockReset()
    })

    it('shows a button for each folder returned by the service', async () => {
        listFolders.mockResolvedValue([folder('tomas', 'Tomás'), folder('fraude', 'Fraude')])

        const wrapper = mount(FolderList, withFolderService)
        await flushPromises()

        expect(wrapper.findAll('button').map((button) => button.text())).toEqual(['Tomás', 'Fraude'])
    })

})
