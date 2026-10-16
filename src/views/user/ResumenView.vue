<script setup>
import { BookOpen, Clock, FolderOpen, Search } from '@lucide/vue'
import { computed, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/shared/dashboard/DashboardLayout.vue'
import BaseButton from '@/shared/BaseButton.vue'

const folderService = inject('FolderService')
const progressService = inject('ProgressService')
const userService = inject('UserService')
const router = useRouter()

const TOTAL_CHAPTERS = 17
const NO_FOLDER = 'Ninguna'
const FIRST_CHAPTER = 1
const NO_CHAPTERS_SOLVED = 0
const PERCENT_FULL = 100
const SECONDS_PER_MINUTE = 60
const SECONDS_PER_HOUR = 3600
const TIME_PART_DIGITS = 2

// alias del jugador, el que guardó al registrarse
const alias = ref('')
const currentChapter = ref(FIRST_CHAPTER)
const timeSpentSeconds = ref(0)
const unlockedFolders = ref([])

// al resolver un capítulo el progreso pasa al siguiente: el 1 es "ninguno resuelto" y el 18 "los 17 resueltos"
const chaptersSolved = computed(() => currentChapter.value - FIRST_CHAPTER)
const percentCompleted = computed(() => Math.round((chaptersSolved.value / TOTAL_CHAPTERS) * PERCENT_FULL))

// estado del caso: sin empezar, en curso o finalizado, con el color de su distintivo
const STATUSES = {
    pending: { label: 'Pendiente de inicio', badge: 'border-outline/30 text-on-surface-variant', dot: 'bg-on-surface-variant' },
    inProgress: { label: 'En progreso', badge: 'border-primary/40 text-primary', dot: 'bg-primary' },
    finished: { label: 'Finalizado', badge: 'border-success/40 text-success', dot: 'bg-success' },
}
const status = computed(() => {
    if (chaptersSolved.value >= TOTAL_CHAPTERS) return STATUSES.finished
    if (chaptersSolved.value > NO_CHAPTERS_SOLVED || timeSpentSeconds.value > 0) return STATUSES.inProgress
    return STATUSES.pending
})

// carpeta activa: la última desbloqueada (el back las devuelve de la más antigua a la más reciente), y ninguna hasta que empieza el caso
const activeFolderName = computed(() => {
    if (status.value === STATUSES.pending || unlockedFolders.value.length === 0) return NO_FOLDER
    return unlockedFolders.value[unlockedFolders.value.length - 1].getName()
})

// tiempo jugado como hh:mm:ss
const timeSpent = computed(() => {
    const hours = Math.floor(timeSpentSeconds.value / SECONDS_PER_HOUR)
    const minutes = Math.floor((timeSpentSeconds.value % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE)
    const seconds = timeSpentSeconds.value % SECONDS_PER_MINUTE
    return [hours, minutes, seconds].map((part) => String(part).padStart(TIME_PART_DIGITS, '0')).join(':')
})

onMounted(async () => {
    const [profile, progress, folders] = await Promise.all([userService.getProfile(), progressService.getProgress(), folderService.listFolders()])
    alias.value = profile.getAlias()
    currentChapter.value = progress.getCurrentChapter()
    timeSpentSeconds.value = progress.getTimeSpentSeconds()
    unlockedFolders.value = folders
})
</script>

<template>
    <DashboardLayout :player-alias="alias">
        <h1 class="resumen-view__title font-display text-4xl text-on-surface">Hola de nuevo, {{ alias }}</h1>
        <p class="resumen-view__subtitle font-body text-base text-on-surface-variant">Aquí tienes un resumen de tu progreso en el caso. El portátil de Clara guardará todo lo que vayas reconstruyendo.</p>

        <section class="resumen-view__case-card relative mt-6 rounded-2xl border border-outline/30 bg-surface-container p-8">
            <span
                class="resumen-view__case-badge mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-label text-[10px] uppercase tracking-widest lg:absolute lg:right-6 lg:top-6 lg:mb-0"
                :class="status.badge"
            >
                <span class="h-1.5 w-1.5 rounded-full" :class="status.dot" />
                {{ status.label }}
            </span>

            <p class="font-label text-xs uppercase tracking-widest text-primary">Sumario de la investigación</p>
            <h2 class="font-display mt-2 text-3xl text-on-surface">Comenzar investigación</h2>

            <div class="resumen-view__chapter mt-6 flex flex-col gap-1 font-label text-base uppercase tracking-wide text-on-surface-variant lg:flex-row lg:items-center lg:justify-between">
                <span class="flex items-center gap-2">
                    <component :is="BookOpen" :size="16" />
                    Capítulo {{ chaptersSolved }} de {{ TOTAL_CHAPTERS }}
                </span>
                <span>{{ percentCompleted }}% completado</span>
            </div>

            <div class="resumen-view__progress-bar mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
                <div class="h-full rounded-full bg-primary" :style="{ width: `${percentCompleted}%` }" />
            </div>

            <div class="resumen-view__info-tiles mt-6 grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3 rounded-xl border border-outline/30 bg-surface p-4">
                    <component :is="Clock" :size="28" class="text-primary" />
                    <div>
                        <p class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Tiempo en el caso</p>
                        <p class="font-mono text-xl text-on-surface">{{ timeSpent }}</p>
                    </div>
                </div>

                <div class="flex items-center gap-3 rounded-xl border border-outline/30 bg-surface p-4">
                    <component :is="FolderOpen" :size="28" class="text-primary" />
                    <div>
                        <p class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Carpeta activa</p>
                        <p class="font-mono text-xl uppercase text-on-surface">{{ activeFolderName }}</p>
                    </div>
                </div>
            </div>

            <div class="resumen-view__cta mt-6 flex justify-center">
                <BaseButton type="button" @click="router.push('/escritorio')">
                    <span class="flex items-center gap-2">
                        Comenzar
                        <component :is="Search" :size="16" />
                    </span>
                </BaseButton>
            </div>
        </section>
    </DashboardLayout>
</template>
