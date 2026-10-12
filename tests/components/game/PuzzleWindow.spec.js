import PuzzleWindow from '@/components/game/PuzzleWindow.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

const validateAnswer = vi.fn()
const getHint = vi.fn()
const mountPuzzleWindow = () => mount(PuzzleWindow, {
    props: { id: 1, title: 'Capítulo 1: La desaparición', question: 'Según la nota, ¿en qué no debes confiar nunca?' },
    global: { provide: { PuzzleService: { validateAnswer, getHint } } },
})

describe('PuzzleWindow', () => {

    it('shows the title, the question and the answer form', () => {
        const wrapper = mountPuzzleWindow()

        expect(wrapper.get('h2').text()).toBe('Capítulo 1: La desaparición')
        expect(wrapper.text()).toContain('Según la nota, ¿en qué no debes confiar nunca?')
        expect(wrapper.get('label').text()).toBe('Tu respuesta')
        expect(wrapper.get('input').exists()).toBe(true)
        expect(wrapper.get('button[type="submit"]').text()).toBe('Comprobar')
    })

})
