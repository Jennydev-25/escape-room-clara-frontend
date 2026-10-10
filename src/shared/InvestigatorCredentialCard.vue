<script setup>
defineProps({
    alias: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <section class="investigator-credential-card">
        <p>{{ alias }}</p>
    </section>
</template>
