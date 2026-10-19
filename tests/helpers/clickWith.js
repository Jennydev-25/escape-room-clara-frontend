import { nextTick } from 'vue'

// simula un clic con el número de clics (detail): 0 teclado, 2 doble clic
export const clickWith = async (wrapper, options) => {
    wrapper.element.dispatchEvent(new MouseEvent('click', { bubbles: true, ...options }))
    await nextTick()
}
