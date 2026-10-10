<script setup>
import { computed } from 'vue'
import { Camera, UserRound } from '@lucide/vue'
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

const avatarSrc = computed(() => (props.avatarId ? avatarImages[props.avatarId - 1] : null))
</script>

<template>
    <section class="investigator-credential-card flex h-full min-h-0 flex-col rounded-2xl border border-outline/30 bg-surface-container p-8">
        <p class="font-label text-center text-xs uppercase tracking-widest text-primary">Credencial de investigador</p>

        <div class="investigator-credential-card__avatar relative mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
            <img
                v-if="avatarSrc"
                :src="avatarSrc"
                :alt="`Avatar ${avatarId}`"
                class="investigator-credential-card__avatar-image h-24 w-24 object-contain"
            >
            <component v-else :is="UserRound" :size="56" />
            <button
                v-if="showAvatarPicker"
                type="button"
                class="investigator-credential-card__avatar-edit absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-on-surface-variant transition-colors hover:text-primary"
                aria-label="Cambiar avatar"
            >
                <component :is="Camera" :size="16" />
            </button>
        </div>

        <p class="font-display mt-4 text-center text-2xl text-on-surface">{{ alias }}</p>
        <p class="font-body text-center text-sm text-on-surface-variant">Alias: {{ alias }}</p>

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
    </section>
</template>
