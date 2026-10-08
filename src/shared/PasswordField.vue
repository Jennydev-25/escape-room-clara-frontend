<script setup>
import { ref, computed } from 'vue'
import { Eye, EyeOff } from '@lucide/vue'

const visible = ref(false)

const type = computed(() => (visible.value ? 'text' : 'password'))

function toggleVisible() {
    visible.value = !visible.value
}
</script>

<template>
    <div class="password-field relative">
        <input :type="type">
        <button type="button" class="password-field__toggle" @click="toggleVisible">
            <component :is="visible ? Eye : EyeOff" />
        </button>
    </div>
</template>
