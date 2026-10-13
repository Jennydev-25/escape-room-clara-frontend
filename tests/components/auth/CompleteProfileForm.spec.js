import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CompleteProfileForm from '@/components/auth/CompleteProfileForm.vue'

describe('CompleteProfileForm', () => {

    it('shows the full name and alias fields with the submit button', () => {
        const wrapper = mount(CompleteProfileForm)

        expect(wrapper.find('#complete-profile-full-name').exists()).toBe(true)
        expect(wrapper.find('#complete-profile-alias').exists()).toBe(true)
        expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    })

    it.each([
        ['fullName', '#complete-profile-full-name', 'Clara Rey'],
        ['alias', '#complete-profile-alias', 'jugador_01'],
    ])('emits update:%s when the field is typed', async (model, selector, value) => {
        const wrapper = mount(CompleteProfileForm)

        await wrapper.get(selector).setValue(value)

        expect(wrapper.emitted(`update:${model}`)[0]).toEqual([value])
    })

})
