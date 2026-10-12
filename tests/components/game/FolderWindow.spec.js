import FolderWindow from '@/components/game/FolderWindow.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

const puzzle = (id, title) => ({ getId: () => id, getTitle: () => title })
const getFolder = vi.fn()
const mountFolderWindow = () => mount(FolderWindow, { props: { code: 'tomas' }, global: { provide: { FolderService: { getFolder } } } })

describe('FolderWindow', () => {

    it('shows the folder name as the title and a button for each of its files', async () => {
        getFolder.mockResolvedValue({
            getName: () => 'Tomás',
            getPuzzles: () => [puzzle(2, 'Capítulo 2: Tomás Elorza'), puzzle(3, 'Capítulo 3: El fraude')],
        })

        const wrapper = mountFolderWindow()
        await flushPromises()

        expect(getFolder).toHaveBeenCalledWith('tomas')
        expect(wrapper.get('h2').text()).toBe('Tomás')
        expect(wrapper.findAll('li button').map((button) => button.text())).toEqual([
            'Capítulo 2: Tomás Elorza',
            'Capítulo 3: El fraude',
        ])
    })

})
