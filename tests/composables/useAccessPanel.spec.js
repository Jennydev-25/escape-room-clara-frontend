import { describe, it, expect } from 'vitest'
import { useAccessPanel } from '@/composables/useAccessPanel'

describe('useAccessPanel', () => {
    it('starts closed, on the login tab', () => {
        const { open, tab } = useAccessPanel()
        expect(open.value).toBe(false)
        expect(tab.value).toBe('login')
    })

    it('openPanel opens the panel on the given tab', () => {
        const { open, tab, openPanel } = useAccessPanel()
        openPanel('register')
        expect(open.value).toBe(true)
        expect(tab.value).toBe('register')
    })
})