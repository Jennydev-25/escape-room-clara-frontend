<script setup>
import { BookOpen, Clock, FolderOpen, Search } from '@lucide/vue'
import DashboardLayout from '@/shared/dashboard/DashboardLayout.vue'
import BaseButton from '@/shared/BaseButton.vue'
</script>

<template>
    <DashboardLayout active-section="inicio" player-alias="jugador_01">
        <h1 class="resumen-view__title font-display text-4xl text-on-surface">Hola de nuevo, jugador_01</h1>
        <p class="resumen-view__subtitle font-body text-base text-on-surface-variant">Aquí tienes un resumen de tu progreso en el caso. El portátil de Clara guardará todo lo que vayas reconstruyendo.</p>

        <section class="resumen-view__case-card relative mt-6 rounded-2xl border border-outline/30 bg-surface-container p-8">
            <span class="resumen-view__case-badge absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-outline/30 px-3 py-1 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                <span class="h-1.5 w-1.5 rounded-full bg-on-surface-variant" />
                Pendiente de inicio
            </span>

            <p class="font-label text-xs uppercase tracking-widest text-primary">Sumario de la investigación</p>
            <h2 class="font-display mt-2 text-3xl text-on-surface">Comenzar investigación</h2>

            <div class="resumen-view__chapter mt-6 flex items-center justify-between font-label text-base uppercase tracking-wide text-on-surface-variant">
                <span class="flex items-center gap-2">
                    <component :is="BookOpen" :size="16" />
                    Capítulo 1 de 17
                </span>
                <span>0% completado</span>
            </div>

            <div class="resumen-view__progress-bar mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
                <div class="h-full rounded-full bg-primary" style="width: 0%" />
            </div>

            <div class="resumen-view__info-tiles mt-6 grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3 rounded-xl border border-outline/30 bg-surface p-4">
                    <component :is="Clock" :size="28" class="text-primary" />
                    <div>
                        <p class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Tiempo en el caso</p>
                        <p class="font-mono text-xl text-on-surface">00:00:00</p>
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
                <BaseButton type="button">
                    <span class="flex items-center gap-2">
                        Comenzar
                        <component :is="Search" :size="16" />
                    </span>
                </BaseButton>
            </div>
        </section>
    </DashboardLayout>
</template>
