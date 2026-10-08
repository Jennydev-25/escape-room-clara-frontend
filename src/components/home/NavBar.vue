<script setup>
const links = [
    { href: '#', label: 'Inicio' },
    { href: '#el-caso', label: 'El caso' },
    { href: '#sobre-el-juego', label: 'Sobre el juego' },
    { href: '#contacto', label: 'Contacto' },
]
</script>

<template>
    <nav
        class="navbar inline-flex items-center gap-6 rounded-full border border-white/20 bg-surface/15 px-6 py-2 shadow-2xl backdrop-blur-2xl backdrop-saturate-150"
        aria-label="Secciones de la página"
    >
        <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="navbar__link font-label text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary"
        >
            {{ link.label }}
        </a>
    </nav>
</template>
