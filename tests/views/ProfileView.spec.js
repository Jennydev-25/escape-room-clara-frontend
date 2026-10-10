import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileView from '@/views/ProfileView.vue'

describe('ProfileView', () => {
    it('renders the profile page title', () => {
        const wrapper = mount(ProfileView)

        expect(wrapper.text()).toContain('Mi perfil')
    })
})
