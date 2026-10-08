import { describe, it, expect } from 'vitest'
import { useAccessPanel } from '@/composables/useAccessPanel'

describe('useAccessPanel', () => {
    it('starts closed, on the login tab', () => {
        const { open, tab } = useAccessPanel()
        expect(open.value).toBe(false)
        expect(tab.value).toBe('login')
    })
})