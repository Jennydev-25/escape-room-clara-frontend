import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSeenStore = defineStore('seen', () => {
    const seen = ref([])
    const isLoaded = ref(false)

    function isSeen(key) {
        return seen.value.includes(key)
    }

    function markSeen(key) {
        if (isSeen(key)) return
        seen.value.push(key)
    }

    function setSeen(keys) {
        seen.value = keys
        isLoaded.value = true
    }

    return { seen, isLoaded, isSeen, markSeen, setSeen }
})
