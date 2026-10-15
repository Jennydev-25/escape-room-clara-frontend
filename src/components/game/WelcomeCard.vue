<script setup>
import { useId } from 'vue'

const titleId = useId()
</script>

<template>
    <!-- aviso centrado: el escritorio se ve desenfocado detrás -->
    <div class="fixed inset-0 z-40 flex items-center justify-center bg-surface/40 p-4 backdrop-blur-sm">
        <section
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            class="flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-outline bg-surface-container text-on-surface shadow-2xl"
        >
            <header class="relative flex items-center justify-center border-b border-outline px-4 py-3 sm:px-6">
                <h2 :id="titleId" class="px-8 text-center font-mono text-sm tracking-wide text-primary uppercase">Sistema ClaraOS · Acceso permitido</h2>
            </header>

            <div class="flex flex-col gap-1 p-4 text-center text-sm leading-relaxed text-on-surface-variant sm:p-6">
                <p>Has accedido al portátil de Clara.</p>
                <p>Revisa sus carpetas con calma: cada archivo puede esconder una pista.</p>
                <p>Todo lo que ella dejó está aquí dentro.</p>
                <p>Busca con cuidado: no sabes qué te vas a encontrar.</p>
            </div>
        </section>
    </div>
</template>
