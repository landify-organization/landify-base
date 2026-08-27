<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
</script>

<template>
  <div
    v-bind="$attrs"
    data-slot="card"
    :class="cn('flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm', props.class)"
  >
    <slot />
  </div>
</template>
