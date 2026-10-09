import { ref } from 'vue'

export function useAccessPanel() {
    const open = ref(false)
    const tab = ref('login')

    function openPanel(initialTab = 'login') {
        tab.value = initialTab
        open.value = true
    }

    function closePanel() {
        open.value = false
    }

    return { open, tab, openPanel, closePanel }
}