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

    it('sends the typed answer to validate it when the form is submitted', async () => {
        validateAnswer.mockResolvedValue({ isCorrect: () => false })
        const wrapper = mountPuzzleWindow()

        await wrapper.get('input').setValue('CLARA')
        await wrapper.get('form').trigger('submit')
        await flushPromises()

        expect(validateAnswer).toHaveBeenCalledWith(1, { value: 'CLARA' })
    })

    it('emits solved when the answer is correct', async () => {
        validateAnswer.mockResolvedValue({ isCorrect: () => true })
        const wrapper = mountPuzzleWindow()

        await wrapper.get('input').setValue('CLARA')
        await wrapper.get('form').trigger('submit')
        await flushPromises()

        expect(wrapper.emitted('solved')).toHaveLength(1)
    })

})
