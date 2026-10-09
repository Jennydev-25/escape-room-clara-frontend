<script setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { gsap } from 'gsap'

const footerEl = useTemplateRef('footerEl')
const footerBar = useTemplateRef('footerBar')

let footerScrollTrigger = null

onMounted(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: footerEl.value,
            start: 'top 90%',
            toggleActions: 'play none none none',
        }
    })
        .from(footerBar.value, { opacity: 0, y: 40, duration: 1, ease: 'power2.out' })

    footerScrollTrigger = timeline.scrollTrigger
})

onUnmounted(() => {
    footerScrollTrigger?.kill()
})
</script>

<template>
    <footer ref="footerEl" class="footer relative overflow-hidden px-6 py-8">
        <div
            ref="footerBar"
            class="footer__bar mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-full border border-white/20 bg-gradient-to-r from-surface/25 via-surface/5 to-surface/25 px-6 py-6 text-center shadow-2xl backdrop-blur-2xl backdrop-saturate-150 sm:flex-row sm:items-center sm:justify-between sm:text-left"
        >
            <div class="footer__brand flex items-center gap-3">
                <img
                    src="@/assets/images/home/logo.png"
                    alt=""
                    class="footer__logo h-14 w-14 shrink-0 object-contain"
                >
                <div class="footer__brand-text flex flex-col items-start gap-1">
                    <span class="footer__name font-display text-lg text-on-surface">El último archivo de Clara</span>
                    <span class="footer__copyright font-body text-xs text-on-surface-variant">
                        © 2026 Todos los derechos reservados
                    </span>
                </div>
            </div>

            <nav class="footer__legal flex flex-wrap items-center justify-center gap-4" aria-label="Legal">
                <a href="#" class="footer__legal-link font-label text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary">
                    Aviso legal
                </a>
                <a href="#" class="footer__legal-link font-label text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary">
                    Política de privacidad
                </a>
                <a href="#" class="footer__legal-link font-label text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary">
                    Condiciones generales
                </a>
            </nav>

            <div class="footer__author flex flex-col items-center gap-1">
                <span class="footer__author-label font-body text-xs text-on-surface-variant">Desarrollado por:</span>
                <a
                    href="https://github.com/Jennydev-25"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="footer__github flex items-center gap-2 whitespace-nowrap font-label text-xs uppercase tracking-widest text-primary transition-colors hover:text-primary-hover"
                >
                    <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    Jennydev-25
                </a>
            </div>
        </div>
    </footer>
</template>
