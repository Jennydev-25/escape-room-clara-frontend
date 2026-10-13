<script setup>
import { computed, ref } from 'vue'
import BaseButton from '@/shared/BaseButton.vue'
import { Barcode, Camera, UserRound } from '@lucide/vue'
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import avatar3 from '@/assets/images/avatars/avatar-3.png'
import avatar4 from '@/assets/images/avatars/avatar-4.png'
import avatar5 from '@/assets/images/avatars/avatar-5.png'
import avatar6 from '@/assets/images/avatars/avatar-6.png'
import avatar7 from '@/assets/images/avatars/avatar-7.png'
import avatar8 from '@/assets/images/avatars/avatar-8.png'
import avatar9 from '@/assets/images/avatars/avatar-9.png'

const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9]

const props = defineProps({
    alias: {
        type: String,
        required: true,
    },
    caseName: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        default: '',
    },
    showAvatarPicker: {
        type: Boolean,
        default: true,
    },
    avatarId: {
        type: Number,
        default: null,
    },
})

const emit = defineEmits(['update:avatar-id'])

const avatarSrc = computed(() => (props.avatarId ? avatarImages[props.avatarId - 1] : null))

const issueDate = '10/2026'
const credentialNumber = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')

const isAvatarPickerOpen = ref(false)

const openAvatarPicker = () => {
    isAvatarPickerOpen.value = true
}

const closeAvatarPicker = () => {
    isAvatarPickerOpen.value = false
}

const selectedAvatarIndex = ref(null)

const selectAvatar = (index) => {
    selectedAvatarIndex.value = index
}

const saveAvatar = () => {
    if (selectedAvatarIndex.value !== null) {
        emit('update:avatar-id', selectedAvatarIndex.value + 1)
    }
    closeAvatarPicker()
}

</script>

<template>
    <section class="investigator-credential-card relative flex min-h-0 flex-col rounded-2xl border border-outline/30 bg-surface-container p-8 lg:h-full">
        <p class="font-label text-center text-xs uppercase tracking-widest text-primary">Credencial de investigador</p>

        <div class="investigator-credential-card__identity mt-6 flex items-center justify-center gap-4">
            <div class="investigator-credential-card__avatar relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-container-high text-on-surface-variant">
                <img
                    v-if="avatarSrc"
                    :src="avatarSrc"
                    :alt="`Avatar ${avatarId}`"
                    class="investigator-credential-card__avatar-image h-full w-full rounded-full object-cover"
                >
                <component v-else :is="UserRound" :size="40" />
                <button
                    v-if="showAvatarPicker"
                    type="button"
                    class="investigator-credential-card__avatar-edit absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-surface text-on-surface-variant transition-colors hover:text-primary"
                    aria-label="Cambiar avatar"
                    @click="openAvatarPicker"
                >
                    <component :is="Camera" :size="14" />
                </button>
            </div>

            <div class="flex min-w-0 flex-col items-center text-center">
                <p class="font-display truncate text-2xl text-on-surface">{{ alias }}</p>
                <p class="font-body truncate text-sm text-on-surface-variant">Alias: {{ alias }}</p>
            </div>
        </div>

        <div
            v-if="isAvatarPickerOpen"
            class="investigator-credential-card__avatar-picker absolute inset-0 z-10 flex flex-col rounded-2xl bg-surface-container p-6"
        >
            <p class="font-label text-xs uppercase tracking-widest text-primary">Elige tu avatar</p>

            <button
                type="button"
                class="investigator-credential-card__avatar-picker-close absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface hover:text-on-surface"
                aria-label="Cerrar selector de avatar"
                @click="closeAvatarPicker"
            >
                &times;
            </button>

            <div class="mt-2 grid grid-cols-3 content-start justify-items-center gap-2">
                <button
                    v-for="(image, index) in avatarImages"
                    :key="index"
                    type="button"
                    :aria-label="`Avatar ${index + 1}`"
                    :aria-pressed="selectedAvatarIndex === index"
                    class="aspect-square w-full max-w-20 overflow-hidden rounded-full border-2 transition-colors hover:border-primary"
                    :class="selectedAvatarIndex === index ? 'border-primary' : 'border-transparent'"
                    @click="selectAvatar(index)"
                >
                    <img :src="image" :alt="`Avatar ${index + 1}`" class="h-full w-full object-cover">
                </button>
            </div>

            <BaseButton type="button" class="investigator-credential-card__avatar-save self-center !mt-2 !px-4 !py-1.5 !text-[10px]" @click="saveAvatar">Guardar cambios</BaseButton>
        </div>

        <dl class="investigator-credential-card__details mt-6 flex flex-col gap-2 border-t border-outline/30 pt-6 font-body text-sm">
            <div class="flex items-center justify-between gap-4">
                <dt class="text-on-surface-variant">Caso asignado</dt>
                <dd class="text-on-surface">{{ caseName }}</dd>
            </div>
            <div class="flex items-center justify-between gap-4">
                <dt class="text-on-surface-variant">Estado</dt>
                <dd class="text-primary">{{ status }}</dd>
            </div>
        </dl>

        <div class="investigator-credential-card__id mt-6 flex items-center justify-between gap-4 border-t border-outline/30 pt-6">
            <div class="flex items-center gap-2">
                <component :is="Barcode" class="h-6 w-14 text-on-surface-variant" />
                <p class="font-mono text-xs text-on-surface">ID Nº {{ credentialNumber }}/{{ issueDate }}</p>
            </div>

            <span class="flex items-center gap-1.5">
                <span class="font-label text-[10px] uppercase tracking-widest text-success">Autorizado</span>
                <span class="h-1.5 w-1.5 rounded-full bg-success" />
            </span>
        </div>
    </section>
</template>
