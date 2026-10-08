<script setup>
defineProps({
    panelOpen: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['abrir-acceso'])
</script>

<template>  
    <section
        class="hero relative flex min-h-screen w-full items-center justify-center overflow-hidden transition-[padding] duration-1000 ease-out before:absolute before:inset-0 before:z-10 before:bg-linear-to-r before:from-surface/85 before:via-surface/60 before:to-surface/15 before:content-[''] motion-reduce:transition-none"
    :class="panelOpen ? 'lg:pr-120' : ''">
        <img src="@/assets/imgs/home/hero.png" alt=""
            class="hero__bg absolute inset-0 z-0 h-full w-full object-cover" />

        <div class="hero__content relative z-20 flex flex-col items-center gap-6 px-6 text-center">
            <h1 class="hero__title font-display text-4xl uppercase text-on-surface sm:text-5xl md:text-6xl">
                El último archivo de Clara
            </h1>

            <p class="hero__tagline font-body max-w-md text-base text-on-surface-variant sm:text-lg">
                Lo que ella no llegó a contar, alguien tiene que terminarlo...
            </p>

            <button type="button" @click="emit('abrir-acceso', 'register')"
                class="hero__cta font-label mt-4 rounded-md border border-primary px-8 py-3 uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-on-primary">
                Investigar
            </button>
        </div>
    </section>
</template>
