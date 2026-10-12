// teclado (detail 0) o pantalla táctil abren con un solo gesto; el ratón, con doble clic
export function shouldOpenOnClick(event) {
    return event.detail === 0 || Boolean(window.matchMedia?.('(pointer: coarse)').matches)
}
