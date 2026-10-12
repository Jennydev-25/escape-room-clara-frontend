import FolderWindow from '@/components/game/FolderWindow.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

const puzzle = (id) => ({ getId: () => id })
const puzzleWithFiles = (...files) => ({ getFiles: () => files })
const getFolder = vi.fn()
const getPuzzle = vi.fn()
const mountFolderWindow = () => mount(FolderWindow, {
    props: { code: 'tomas' },
    global: { provide: { FolderService: { getFolder }, PuzzleService: { getPuzzle } } },
})

describe('FolderWindow', () => {

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

})
