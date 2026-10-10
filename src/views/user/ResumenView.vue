<script setup>
import DashboardLayout from '@/shared/dashboard/DashboardLayout.vue'
</script>

<template>
    <DashboardLayout active-section="inicio" player-alias="jugador_01">
        <h1 class="resumen-view__title font-display text-4xl text-on-surface">Hola de nuevo, jugador_01</h1>
        <p class="resumen-view__subtitle font-body text-base text-on-surface-variant">Aquí tienes un resumen de tu progreso en el caso. El portátil de Clara guardará todo lo que vayas reconstruyendo.</p>

        <section class="resumen-view__case-card relative mt-6 rounded-2xl border border-outline/30 bg-surface-container p-8">
            <span class="resumen-view__case-badge absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-outline/30 px-3 py-1 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                <span class="h-1.5 w-1.5 rounded-full bg-success" />
                Pendiente de inicio
            </span>

            <p class="font-label text-xs uppercase tracking-widest text-primary">Sumario de la investigación</p>
            <h2 class="font-display mt-2 text-3xl text-on-surface">Comenzar investigación</h2>
        </section>
    </DashboardLayout>
</template>
