import { ref } from 'vue'

export function useAccessPanel() {
    const open = ref(false)
    const tab = ref('login')

    return { open, tab }
}