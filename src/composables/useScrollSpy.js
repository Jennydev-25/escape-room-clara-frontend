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
        observer = new IntersectionObserver(handleIntersect, {
            rootMargin: '-40% 0px -40% 0px',
        })

        sectionIds.forEach((id) => {
            observer.observe(document.getElementById(id))
        })
    })

    onUnmounted(() => {
        observer?.disconnect()
    })

    return { activeId }
}
