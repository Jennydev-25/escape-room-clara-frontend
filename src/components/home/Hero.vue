<template>
    <section
        class="hero relative flex min-h-screen w-full items-center justify-center overflow-hidden before:absolute before:inset-0 before:z-10 before:bg-clara-bg/75 before:content-['']">
        <img src="@/assets/imgs/home/hero.png" alt=""
            class="hero__bg absolute inset-0 z-0 h-full w-full object-cover" />

        <div class="hero__content relative z-20 flex flex-col items-center gap-6 px-6 text-center">
            <h1 class="hero__title font-display text-4xl uppercase text-clara-text sm:text-5xl md:text-6xl">
                El último archivo de Clara
            </h1>

            <p class="hero__tagline font-body max-w-md text-base text-clara-text-dim sm:text-lg">
                Lo que ella no llegó a contar, alguien tiene que terminarlo...
            </p>

            <button type="button"
                class="hero__cta font-label mt-4 border border-clara-accent px-8 py-3 uppercase tracking-widest text-clara-accent transition-colors hover:bg-clara-accent hover:text-clara-ink">
                Investigar
            </button>
        </div>
    </section>
</template>