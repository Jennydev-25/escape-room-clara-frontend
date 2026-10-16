<script setup>
import { BookOpen, Clock, FolderOpen, Search } from '@lucide/vue'
import { computed, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/shared/dashboard/DashboardLayout.vue'
import BaseButton from '@/shared/BaseButton.vue'

const progressService = inject('ProgressService')
const userService = inject('UserService')
const router = useRouter()

const TOTAL_CHAPTERS = 17

// alias del jugador, el que guardó al registrarse
const alias = ref('')
const currentChapter = ref(1)
const timeSpentSeconds = ref(0)

// al resolver un capítulo el progreso pasa al siguiente: el 18 significa que están los 17 resueltos
const chapterShown = computed(() => Math.min(currentChapter.value, TOTAL_CHAPTERS))
const percentCompleted = computed(() => Math.round(((currentChapter.value - 1) / TOTAL_CHAPTERS) * 100))

// tiempo jugado como hh:mm:ss
const timeSpent = computed(() => {
    const hours = Math.floor(timeSpentSeconds.value / 3600)
    const minutes = Math.floor((timeSpentSeconds.value % 3600) / 60)
    const seconds = timeSpentSeconds.value % 60
    return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':')
})

onMounted(async () => {
    const [profile, progress] = await Promise.all([userService.getProfile(), progressService.getProgress()])
    alias.value = profile.getAlias()
    currentChapter.value = progress.getCurrentChapter()
    timeSpentSeconds.value = progress.getTimeSpentSeconds()
})
</script>

<template>
    <DashboardLayout :player-alias="alias">
        <h1 class="resumen-view__title font-display text-4xl text-on-surface">Hola de nuevo, {{ alias }}</h1>
        <p class="resumen-view__subtitle font-body text-base text-on-surface-variant">Aquí tienes un resumen de tu progreso en el caso. El portátil de Clara guardará todo lo que vayas reconstruyendo.</p>

        <section class="resumen-view__case-card relative mt-6 rounded-2xl border border-outline/30 bg-surface-container p-8">
            <span class="resumen-view__case-badge mb-4 inline-flex items-center gap-1.5 rounded-full border border-outline/30 px-3 py-1 font-label text-[10px] uppercase tracking-widest text-on-surface-variant lg:absolute lg:right-6 lg:top-6 lg:mb-0">
                <span class="h-1.5 w-1.5 rounded-full bg-on-surface-variant" />
                Pendiente de inicio
            </span>

            <p class="font-label text-xs uppercase tracking-widest text-primary">Sumario de la investigación</p>
            <h2 class="font-display mt-2 text-3xl text-on-surface">Comenzar investigación</h2>

            <div class="resumen-view__chapter mt-6 flex flex-col gap-1 font-label text-base uppercase tracking-wide text-on-surface-variant lg:flex-row lg:items-center lg:justify-between">
                <span class="flex items-center gap-2">
                    <component :is="BookOpen" :size="16" />
                    Capítulo {{ chapterShown }} de {{ TOTAL_CHAPTERS }}
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
                        <p class="font-mono text-xl uppercase text-on-surface">Ninguna</p>
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
