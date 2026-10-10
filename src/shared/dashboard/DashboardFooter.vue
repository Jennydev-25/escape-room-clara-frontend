<script setup>
</script>

<template>
    <footer class="dashboard-footer border-t border-outline/30 bg-surface px-6 py-3">
        <div class="dashboard-footer__bar flex w-full items-center justify-between gap-8">
            <div class="dashboard-footer__brand flex items-center gap-2 whitespace-nowrap">
                <span class="font-body text-xs text-on-surface-variant">© 2026 Todos los derechos reservados</span>
            </div>

            <nav class="dashboard-footer__legal flex flex-wrap items-center justify-center gap-3" aria-label="Legal">
                <a href="#" class="font-label text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary">
                    Aviso legal
                </a>
                <a href="#" class="font-label text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary">
                    Política de privacidad
                </a>
                <a href="#" class="font-label text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary">
                    Condiciones generales
                </a>
            </nav>

            <a
                href="https://github.com/Jennydev-25"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 whitespace-nowrap font-label text-xs uppercase tracking-wide text-primary transition-colors hover:text-primary-hover"
            >
                <span class="font-body text-xs normal-case tracking-normal text-on-surface-variant">Desarrollado por:</span>
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 fill-current" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Jennydev-25
            </a>
        </div>
    </footer>
</template>
