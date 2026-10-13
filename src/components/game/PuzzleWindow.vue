<script setup>
import { X } from '@lucide/vue'
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
            <p class="text-base leading-relaxed text-on-surface">{{ question }}</p>

            <div class="flex flex-col gap-1">
                <label :for="answerId">Tu respuesta</label>
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
