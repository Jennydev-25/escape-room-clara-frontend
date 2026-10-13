import FileViewer from '@/components/game/FileViewer.vue'
import TrashWindow from '@/components/game/TrashWindow.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

const file = (name, body) => ({ getName: () => name, getBody: () => body })
const listDiscardedFiles = vi.fn()
const mountTrashWindow = () => mount(TrashWindow, { global: { stubs: { FileViewer: true }, provide: { TrashService: { listDiscardedFiles } } } })

describe('TrashWindow', () => {

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

})
