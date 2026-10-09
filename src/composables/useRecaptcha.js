const SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js?render=explicit'
const SCRIPT_SELECTOR = `script[src^="https://www.google.com/recaptcha/api.js"]`

function ensureScriptLoaded() {
    const existingScript = document.head.querySelector(SCRIPT_SELECTOR)

    if (existingScript) {
        if (window.grecaptcha) return Promise.resolve()
        return new Promise((resolve) => existingScript.addEventListener('load', resolve, { once: true }))
    }

    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = SCRIPT_SRC
        script.async = true
        script.defer = true
        script.addEventListener('load', resolve, { once: true })
        document.head.appendChild(script)
    })
}

export function useRecaptcha() {

    async function renderWidget(containerEl) {
        await ensureScriptLoaded()
        return window.grecaptcha.render(containerEl, {
            sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        })
    }

    function getToken(widgetId) {
        return window.grecaptcha.getResponse(widgetId)
    }

    function reset(widgetId) {
        window.grecaptcha.reset(widgetId)
    }

    return { renderWidget, getToken, reset }
}
