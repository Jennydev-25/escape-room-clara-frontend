import { ref } from 'vue'

export function useScrollSpy(sectionIds) {
    const activeId = ref(null)

    return { activeId }
}
