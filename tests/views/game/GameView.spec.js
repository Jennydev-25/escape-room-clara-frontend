import GameView from '@/views/game/GameView.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('GameView', () => {

    it('shows the ClaraOS desktop with the ClaraOS theme', () => {
        const wrapper = mount(GameView)

        expect(wrapper.get('main').classes()).toContain('theme-clara-os')
        expect(wrapper.get('h1').text()).toBe('Escritorio de ClaraOS')
    })

})
