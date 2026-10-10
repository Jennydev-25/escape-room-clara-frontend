<script setup>
defineProps({
    type: { type: String, default: 'button' },
    size: { type: String, default: 'md' },
})
</script>

<template>
    <button
        :type="type"
        class="base-button font-label rounded-md border border-primary uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary"
        :class="size === 'lg' ? 'mt-4 px-8 py-3' : 'mt-2 px-6 py-2'"
    >
        <slot />
    </button>
</template>
