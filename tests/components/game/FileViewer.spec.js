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

    it('shows a pdf file in a frame titled with the file name', async () => {
        getFileUrl.mockResolvedValue('blob:facturas')

        const wrapper = mountFileViewer('/fraude/hoja_calculo_facturas.pdf')
        await flushPromises()

        expect(wrapper.get('iframe').attributes('src')).toBe('blob:facturas')
        expect(wrapper.get('iframe').attributes('title')).toBe('hoja_calculo_facturas.pdf')
        expect(wrapper.find('pre').exists()).toBe(false)
    })

    it('shows the zoom buttons for an image file', async () => {
        getFileUrl.mockResolvedValue('blob:tomas')

        const wrapper = mountFileViewer('/tomas/tomas_elorza.png')
        await flushPromises()

        expect(wrapper.find('button[aria-label="Acercar"]').exists()).toBe(true)
        expect(wrapper.find('button[aria-label="Alejar"]').exists()).toBe(true)
    })

    it('enlarges the image when the zoom in button is clicked', async () => {
        getFileUrl.mockResolvedValue('blob:tomas')
        const wrapper = mountFileViewer('/tomas/tomas_elorza.png')
        await flushPromises()

        await wrapper.get('button[aria-label="Acercar"]').trigger('click')

        expect(wrapper.get('img').attributes('style')).toContain('zoom: 1.25')
    })

    it('shrinks the image when the zoom out button is clicked', async () => {
        getFileUrl.mockResolvedValue('blob:tomas')
        const wrapper = mountFileViewer('/tomas/tomas_elorza.png')
        await flushPromises()

        await wrapper.get('button[aria-label="Alejar"]').trigger('click')

        expect(wrapper.get('img').attributes('style')).toContain('zoom: 0.75')
    })

    it.each([
        ['Alejar', 5, 'zoom: 0.5'],
        ['Acercar', 10, 'zoom: 3'],
    ])('stops the zoom at its limit when %s is clicked %i times', async (label, clicks, expectedZoom) => {
        getFileUrl.mockResolvedValue('blob:tomas')
        const wrapper = mountFileViewer('/tomas/tomas_elorza.png')
        await flushPromises()

        for (let click = 0; click < clicks; click++) {
            await wrapper.get(`button[aria-label="${label}"]`).trigger('click')
        }

        expect(wrapper.get('img').attributes('style')).toContain(expectedZoom)
    })

})
