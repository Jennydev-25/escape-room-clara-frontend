<script setup>
import { Lightbulb, X } from '@lucide/vue'
import { inject, ref, useId } from 'vue'
import BaseButton from '@/shared/BaseButton.vue'
import BaseWindow from '@/shared/BaseWindow.vue'

const props = defineProps({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    question: { type: String, required: true },
})

const emit = defineEmits(['close', 'solved'])

const puzzleService = inject('PuzzleService')
const answerId = useId()
const answer = ref('')
const isWrong = ref(false)
const showHints = ref(false)
const openHint = ref(null)
const hintTexts = ref({})

// abre una pista (solo una a la vez), la cierra si ya estaba abierta y pide su texto la primera vez
async function toggleHint(number) {
    if (openHint.value === number) {
        openHint.value = null
        return
    }
    openHint.value = number
    if (!hintTexts.value[number]) {
        const hint = await puzzleService.getHint(props.id, number)
        hintTexts.value[number] = hint.getText()
    }
}

// manda la respuesta escrita para que el backend la valide
async function submitAnswer() {
    const result = await puzzleService.validateAnswer(props.id, { value: answer.value })
    if (result.isCorrect()) {
        emit('solved')
    } else {
        isWrong.value = true
    }
}
</script>

<template>
    <BaseWindow :title="title" @close="emit('close')">
        <form class="flex flex-col gap-4" @submit.prevent="submitAnswer">
            <div class="flex items-start justify-between gap-3">
                <p class="text-lg leading-relaxed text-on-surface">{{ question }}</p>
                <button
                    type="button"
                    class="group flex size-10 shrink-0 items-center justify-center rounded-full text-os-clue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-os-clue"
                    aria-label="Pistas"
                    @click="showHints = !showHints"
                >
                    <Lightbulb class="size-8 transition-colors group-hover:fill-os-clue/40" aria-hidden="true" />
                </button>
            </div>

            <ul v-if="showHints" class="flex flex-col gap-2">
                <li v-for="number in 3" :key="number">
                    <button
                        type="button"
                        class="w-full rounded-md border border-outline px-3 py-2 text-left text-on-surface-variant transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        :aria-expanded="openHint === number"
                        @click="toggleHint(number)"
                    >
                        Pista {{ number }}
                    </button>
                    <p v-if="openHint === number" class="px-3 py-2 text-sm leading-relaxed text-on-surface">{{ hintTexts[number] }}</p>
                </li>
            </ul>

            <div class="flex flex-col gap-1">
                <label :for="answerId" class="text-on-surface-variant">Tu respuesta</label>
                <input
                    :id="answerId"
                    v-model="answer"
                    type="text"
                    autocomplete="off"
                    placeholder="Respuestas sólo en mayúsculas"
                    class="w-full rounded-md border border-outline bg-surface px-3 py-2 text-on-surface placeholder:text-error focus:border-primary focus:outline-none"
                >
            </div>

            <div v-if="isWrong" role="alert" class="flex items-center justify-between gap-3 rounded-2xl border border-error bg-error/25 px-4 py-3 text-sm text-os-on-rust">
                <p>Respuesta incorrecta</p>
                <button
                    type="button"
                    class="flex size-8 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/15 hover:text-on-surface active:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label="Cerrar aviso"
                    @click="isWrong = false"
                >
                    <X class="size-5" aria-hidden="true" />
                </button>
            </div>

            <BaseButton type="submit">
                Comprobar
            </BaseButton>
        </form>
    </BaseWindow>
</template>
