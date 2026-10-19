<script setup>
import BaseButton from '@/shared/BaseButton.vue'

const fullName = defineModel('fullName', { type: String, default: '' })
const alias = defineModel('alias', { type: String, default: '' })

defineEmits(['submit'])
</script>

<template>
    <form class="complete-profile-form flex flex-col gap-4" @submit.prevent="$emit('submit')">
        <div class="complete-profile-form__field flex flex-col gap-1">
            <label for="complete-profile-full-name">Nombre completo</label>
            <input
                id="complete-profile-full-name"
                type="text"
                required
                v-model="fullName"
                class="w-full rounded-md border border-outline bg-surface-container px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
            >
        </div>

        <div class="complete-profile-form__field flex flex-col gap-1">
            <label for="complete-profile-alias">Alias</label>
            <input
                id="complete-profile-alias"
                type="text"
                required
                v-model="alias"
                class="w-full rounded-md border border-outline bg-surface-container px-3 py-2 text-on-surface focus:border-primary focus:outline-none"
            >
        </div>

        <BaseButton type="submit" class="complete-profile-form__submit">
            Continuar
        </BaseButton>
    </form>
</template>
