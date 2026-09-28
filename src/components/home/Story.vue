<template>
    <section class="story relative overflow-hidden bg-clara-bg px-6 py-16 sm:py-24">
        <div class="story__container mx-auto flex max-w-6xl flex-col gap-12 sm:flex-row sm:items-center sm:gap-16">
            <div class="story__content flex flex-1 flex-col gap-6 text-clara-text-dim">
                <h2 class="story__heading font-display text-2xl text-clara-text sm:text-3xl">
                    Un pueblo pesquero. Un incendio. Una historia sin resolver.
                </h2>

                <p class="story__paragraph font-body text-base sm:text-lg">
                    Todos los pueblos guardan leyendas. San Adrián de Mar guarda secretos.
                </p>

                <p class="story__paragraph font-body text-base sm:text-lg">
                    En 2005, el engranaje que sostiene la vida del pueblo, su conservera, se incendia y se
                    cobra la vida de un trabajador. La investigación oficial habla de un accidente. El
                    pueblo sigue adelante, poco a poco, y nadie vuelve a preguntar. Hasta ahora.
                </p>

                <p class="story__paragraph font-body text-base sm:text-lg">
                    Veinte años después, la periodista Clara Vega empezó a hacer las preguntas que nadie
                    quiso hacer entonces. Cuanto más se acercaba a la verdad, más peligroso se volvía seguir
                    buscándola.
                </p>

                <p class="story__paragraph font-body text-base sm:text-lg">
                    Clara reunió pruebas. Siguió pistas. Se acercó más que nadie a la verdad. Y entonces,
                    desapareció, dejando solo un ordenador encendido y un secreto por resolver.
                </p>

                <p class="story__paragraph font-body text-base sm:text-lg">
                    Ahora eres tú quien se sienta frente a esa pantalla. Descubre todo lo que ella descubrió.
                    Entiende todo lo que ella entendió. Termina lo que ella empezó.
                </p>

                <p class="story__question font-display text-xl italic text-clara-accent sm:text-2xl">
                    ¿Descubrirás la verdad?
                </p>
            </div>

            <div class="story__photos relative mx-auto w-72 sm:w-80 md:w-96">
                <img src="@/assets/imgs/home/story-harbor.png" alt=""
                    class="story__photo relative z-0 w-full -rotate-6 shadow-xl" />
                <img src="@/assets/imgs/home/story-fire.png" alt=""
                    class="story__photo absolute left-0 top-0 z-10 w-full translate-x-4 translate-y-6 rotate-3 shadow-xl" />
                <img src="@/assets/imgs/home/story-laptop.png" alt=""
                    class="story__photo absolute left-0 top-0 z-20 w-full translate-x-8 translate-y-12 -rotate-2 shadow-xl" />
            </div>
        </div>
    </section>
</template>