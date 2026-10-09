import { describe, it, expect, beforeEach } from 'vitest'
import { useRecaptcha } from '@/composables/useRecaptcha'

const SCRIPT_SELECTOR = 'script[src^="https://www.google.com/recaptcha/api.js"]'

describe('useRecaptcha', () => {
    beforeEach(() => {
        document.head.querySelectorAll(SCRIPT_SELECTOR).forEach((el) => el.remove())
        window.grecaptcha = { render: () => 1 }
    })

    it('loads the Google reCAPTCHA script into the document head only once', () => {
        const { renderWidget } = useRecaptcha()
        const container1 = document.createElement('div')
        const container2 = document.createElement('div')

        renderWidget(container1)
        renderWidget(container2)

        expect(document.head.querySelectorAll(SCRIPT_SELECTOR)).toHaveLength(1)
    })
})
