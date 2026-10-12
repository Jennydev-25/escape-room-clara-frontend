import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSeenStore = defineStore('seen', () => {
    const seen = ref(JSON.parse(localStorage.getItem('seen') ?? '[]'))

    function isSeen(key) {
        return seen.value.includes(key)
    }

    function markSeen(key) {
        if (isSeen(key)) return
        seen.value.push(key)
        localStorage.setItem('seen', JSON.stringify(seen.value))
    }

    return { isSeen, markSeen }
})
