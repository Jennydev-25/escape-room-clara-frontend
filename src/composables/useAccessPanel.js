import { ref } from 'vue'

export function useAccessPanel() {
    const open = ref(false)
    const tab = ref('login')

    function openPanel(initialTab = 'login') {
        tab.value = initialTab
        open.value = true
    }

    return { open, tab, openPanel }
}