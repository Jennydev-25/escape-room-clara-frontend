<script setup>
import { ref, computed } from 'vue'
import { Eye, EyeOff } from '@lucide/vue'

defineOptions({ inheritAttrs: false })

const model = defineModel({ type: String, default: '' })

const visible = ref(false)

const type = computed(() => (visible.value ? 'text' : 'password'))

function toggleVisible() {
    visible.value = !visible.value
}
</script>

<template>
    <div class="password-field relative">
        <input
            :type="type"
            v-model="model"
            v-bind="$attrs"
            class="w-full rounded-md border border-outline bg-surface px-3 py-2 pr-10 text-on-surface focus:border-primary focus:outline-none"
        >
        <button
            type="button"
            class="password-field__toggle absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-on-surface"
            @click="toggleVisible"
        >
            <component :is="visible ? Eye : EyeOff" :size="18" />
        </button>
    </div>
</template>
