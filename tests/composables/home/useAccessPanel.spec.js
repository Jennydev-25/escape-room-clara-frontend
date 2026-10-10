import { describe, it, expect } from 'vitest'
import { useAccessPanel } from '@/composables/home/useAccessPanel'

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

    it('openPanel defaults to the login tab when none is given', () => {
        const { open, tab, openPanel } = useAccessPanel()
        openPanel()
        expect(open.value).toBe(true)
        expect(tab.value).toBe('login')
    })

    it('closePanel closes the panel without changing the active tab', () => {
        const { open, tab, openPanel, closePanel } = useAccessPanel()
        openPanel('register')
        closePanel()
        expect(open.value).toBe(false)
        expect(tab.value).toBe('register')
    })
})