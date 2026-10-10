<script setup>
defineProps({
    activeSection: {
        type: String,
        required: true,
    },
    playerAlias: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div class="dashboard-layout">
        <header class="dashboard-layout__header">
            <span class="dashboard-layout__alias">{{ playerAlias }}</span>
        </header>
    </div>
</template>
