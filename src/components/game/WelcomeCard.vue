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
            class="flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-outline bg-surface-container text-on-surface shadow-2xl"
        >
            <header class="flex items-center justify-between gap-3 border-b border-outline px-4 py-3 sm:px-6">
                <h2 :id="titleId" class="min-w-0 truncate font-mono text-sm tracking-wide text-primary uppercase">Sistema ClaraOS · Acceso permitido</h2>
            </header>
        </section>
    </div>
</template>
