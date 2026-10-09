const SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js?render=explicit'

function ensureScriptLoaded() {
    const alreadyLoaded = document.head.querySelector(`script[src^="${SCRIPT_SRC}"]`)
    if (alreadyLoaded) return

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    document.head.appendChild(script)
}

export function useRecaptcha() {

    function renderWidget(containerEl) {
        ensureScriptLoaded()
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
