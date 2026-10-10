<script setup>
const props = defineProps({
    activeSection: {
        type: String,
        required: true,
    },
    playerAlias: {
        type: String,
        required: true,
    },
})

const currentPageOrUndefined = (section) => (props.activeSection === section ? 'page' : undefined)
</script>

<template>
    <div class="dashboard-layout">
        <header class="dashboard-layout__header">
            <span class="dashboard-layout__alias">{{ playerAlias }}</span>
        </header>
        <nav class="dashboard-layout__nav">
            <a href="#" :aria-current="currentPageOrUndefined('inicio')">Resumen</a>
            <a href="#" :aria-current="currentPageOrUndefined('perfil')">Mi perfil</a>
        </nav>
        <main class="dashboard-layout__content">
            <slot />
        </main>
    </div>
</template>
