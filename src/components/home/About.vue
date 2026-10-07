<script setup>

import { NotebookText, FolderOpen, Search, Lightbulb, Save, Trophy } from '@lucide/vue'

const statRows = [
    [
        { icon: NotebookText, value: '17', label: 'Capítulos' },
        { icon: FolderOpen, value: '12', label: 'Carpetas' },
        { icon: Search, value: '62', label: 'Piezas' },
    ],
    [
        { icon: Lightbulb, label: 'Sistema de pistas' },
        { icon: Save, label: 'Progreso guardado' },
        { icon: Trophy, label: 'Ranking jugadores' },
    ],
]
</script>

<template>
    <section class="about relative overflow-hidden bg-surface px-6 pt-16 sm:pt-24">
        <div class="about__container mx-auto flex max-w-6xl flex-col gap-12 sm:flex-row sm:items-center sm:gap-16">
            <div class="about__media mx-auto flex flex-col items-center">
                <img src="@/assets/imgs/home/about.png" alt=""
                    class="about__photo w-72 shrink-0 shadow-xl sm:w-80 md:w-96" />

                <div class="about__stats mt-8 flex flex-col items-center gap-6">
                    <div v-for="(row, rowIndex) in statRows" :key="rowIndex"
                        class="about__stats-row flex justify-center gap-x-8">
                        <div v-for="stat in row" :key="stat.label"
                            class="about__stat flex w-20 flex-col items-center gap-2 text-center">
                            <component :is="stat.icon"
                                class="about__stat-icon h-8 w-8 text-primary transition-transform duration-200 hover:scale-110" />
                            <span v-if="stat.value" class="about__stat-value font-mono text-2xl text-on-surface">
                                {{ stat.value }}
                            </span>
                            <span
                                class="about__stat-label font-label text-xs uppercase tracking-widest text-on-surface-variant">
                                {{ stat.label }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="about__content flex flex-1 flex-col gap-6 text-on-surface-variant">
                <h2 class="about__heading font-display text-2xl text-on-surface sm:text-3xl">
                    No es un juego de adivinar. Es una investigación.
                </h2>

                <p class="about__paragraph font-body text-base sm:text-lg">
                    Aquí no hay preguntas al azar ni pistas sueltas. Cada carpeta que abras es un bloque
                    real de la investigación de Clara: documentos, fotografías, grabaciones, mensajes
                    cifrados. Ninguna pieza se entiende sola; hay que cruzarla con las demás para que la
                    historia encaje.
                </p>

                <p class="about__paragraph font-body text-base sm:text-lg">
                    17 capítulos. 12 carpetas. 62 piezas de evidencia repartidas entre ellas, esperando a
                    que alguien las conecte. Nada se te explica de golpe: se descubre, en el mismo orden en
                    que ella lo descubrió.
                </p>

                <p class="about__paragraph font-body text-base sm:text-lg">
                    Si te atascas en alguna prueba, tienes hasta tres pistas disponibles, sin coste ni
                    penalización. No es una carrera contra el reloj: lo único que se mide es cuánto tardas
                    en cerrar el caso por completo, para que puedas compararte con otros investigadores
                    cuando quieras.
                </p>

                <p class="about__paragraph font-body text-base sm:text-lg">
                    Tu progreso se guarda. Puedes cerrar el portátil y volver cuando quieras; la
                    investigación sigue exactamente donde la dejaste.
                </p>

                <p class="about__paragraph font-body text-base sm:text-lg">
                    Este proyecto ha sido creado con mucha dedicación, y espero que lo disfrutes tanto como
                    yo disfruté creándolo.
                </p>

                <p class="about__closing font-display text-xl italic text-primary sm:text-2xl">
                    Gracias por darle una oportunidad a esta historia.
                </p>
            </div>
        </div>
    </section>
</template>