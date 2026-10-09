import { describe, it, expect } from 'vitest'
import { useScrollSpy } from '@/composables/useScrollSpy'

describe('useScrollSpy', () => {
    it('starts with no active section', () => {
        const { activeId } = useScrollSpy(['el-caso', 'sobre-el-juego', 'contacto'])
        expect(activeId.value).toBe(null)
    })
})
