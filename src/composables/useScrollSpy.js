import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollSpy(sectionIds) {
    const activeId = ref(null)
    let observer = null

    function handleIntersect(entries) {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (visibleEntry) {
            activeId.value = visibleEntry.target.id
        }
    }

    onMounted(() => {
        observer = new IntersectionObserver(handleIntersect)

        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
    })

    onUnmounted(() => {
        observer?.disconnect()
    })

    return { activeId }
}
