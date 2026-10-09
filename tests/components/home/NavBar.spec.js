import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import NavBar from '@/components/home/NavBar.vue'

const activeId = ref(null)

vi.mock('@/composables/useScrollSpy', () => ({
    useScrollSpy: () => ({ activeId }),
}))

describe('NavBar', () => {
    it('marks "Inicio" as active when no section is active yet', () => {
        activeId.value = null
        const wrapper = mount(NavBar)

        const inicioLink = wrapper.findAll('.navbar__link').find((link) => link.text() === 'Inicio')

        expect(inicioLink.classes()).toContain('text-primary')
    })
})
