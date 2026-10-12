import BaseWindow from '@/shared/BaseWindow.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('BaseWindow', () => {

    it('shows the title and the content inside an accessible dialog', () => {
        const wrapper = mount(BaseWindow, { props: { title: 'Tomás' }, slots: { default: '<p>Contenido</p>' } })

        const dialog = wrapper.get('[role="dialog"]')

        expect(dialog.attributes('aria-modal')).toBe('true')
        expect(wrapper.get(`#${dialog.attributes('aria-labelledby')}`).text()).toBe('Tomás')
        expect(dialog.text()).toContain('Contenido')
    })

    it('asks to be closed when the close button is clicked', async () => {
        const wrapper = mount(BaseWindow, { props: { title: 'Tomás' } })

        await wrapper.get('button[aria-label="Cerrar"]').trigger('click')

        expect(wrapper.emitted('close')).toHaveLength(1)
    })

    it('asks to be closed when Escape is pressed', async () => {
        const wrapper = mount(BaseWindow, { props: { title: 'Tomás' } })

        await wrapper.get('[role="dialog"]').trigger('keydown', { key: 'Escape' })

        expect(wrapper.emitted('close')).toHaveLength(1)
    })

})
