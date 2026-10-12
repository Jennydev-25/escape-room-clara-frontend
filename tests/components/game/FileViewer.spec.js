import FileViewer from '@/components/game/FileViewer.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

const getFileUrl = vi.fn()
const mountFileViewer = (path) => mount(FileViewer, { props: { path }, global: { provide: { StaticFileService: { getFileUrl } } } })

describe('FileViewer', () => {

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('shows a text file as it is in the back, titled with the file name', async () => {
        getFileUrl.mockResolvedValue('blob:leeme')
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ text: async () => 'Si estás leyendo esto, no me has encontrado a mí.' }))

        const wrapper = mountFileViewer('/leeme/leeme.txt')
        await flushPromises()

        expect(getFileUrl).toHaveBeenCalledWith('/leeme/leeme.txt')
        expect(wrapper.get('h2').text()).toBe('leeme.txt')
        expect(wrapper.get('pre').text()).toBe('Si estás leyendo esto, no me has encontrado a mí.')
    })

    it('shows an image file as a picture', async () => {
        getFileUrl.mockResolvedValue('blob:tomas')

        const wrapper = mountFileViewer('/tomas/tomas_elorza.png')
        await flushPromises()

        expect(wrapper.get('img').attributes('src')).toBe('blob:tomas')
        expect(wrapper.get('img').attributes('alt')).toBe('tomas_elorza.png')
        expect(wrapper.find('pre').exists()).toBe(false)
    })

})
