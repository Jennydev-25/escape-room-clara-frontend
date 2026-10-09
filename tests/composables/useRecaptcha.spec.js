import { describe, it, expect, vi, beforeEach } from 'vitest'
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

    it('waits for the script to finish loading before rendering the widget', async () => {
        delete window.grecaptcha

        const { renderWidget } = useRecaptcha()
        const container = document.createElement('div')
        const renderSpy = vi.fn(() => 2)

        const widgetIdPromise = renderWidget(container)

        expect(renderSpy).not.toHaveBeenCalled()

        window.grecaptcha = { render: renderSpy }
        document.head.querySelector(SCRIPT_SELECTOR).dispatchEvent(new Event('load'))

        const widgetId = await widgetIdPromise

        expect(renderSpy).toHaveBeenCalledWith(container, expect.objectContaining({ sitekey: expect.any(String) }))
        expect(widgetId).toBe(2)
    })
})
