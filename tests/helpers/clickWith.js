import { nextTick } from 'vue'

// lanza un clic con options (ej. detail); trigger no deja asignar detail en jsdom
export const clickWith = async (wrapper, options) => {
    wrapper.element.dispatchEvent(new MouseEvent('click', { bubbles: true, ...options }))
    await nextTick()
}
