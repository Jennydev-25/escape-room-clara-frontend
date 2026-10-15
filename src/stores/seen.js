import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSeenStore = defineStore('seen', () => {
    const seen = ref([])
    const isLoaded = ref(false)
    let service = null

    function isSeen(key) {
        return seen.value.includes(key)
    }

    function markSeen(key) {
        if (isSeen(key)) return
        seen.value.push(key)
        service?.markSeen(key)
    }

    async function load(seenService) {
        service = seenService
        const items = await seenService.listSeen()
        seen.value = items.map((item) => item.getKey())
        isLoaded.value = true
    }

    return { isLoaded, isSeen, markSeen, load }
})
