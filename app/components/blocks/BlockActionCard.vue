<script setup lang="ts">
import UiButton from '../ui/UiButton.vue'

interface Props {
  actionLabel?: string
  description?: string
  eyebrow?: string
  title?: string
}

withDefaults(defineProps<Props>(), {
  actionLabel: 'Review settings',
  description: 'Use this generic composition for a focused next step in a marketing or admin surface.',
  eyebrow: 'Next step',
  title: 'Keep your workspace ready',
})

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <section class="grid gap-5 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <div class="space-y-2">
      <p class="text-sm font-medium text-primary">{{ eyebrow }}</p>
      <h2 class="text-xl font-semibold tracking-tight">{{ title }}</h2>
      <p class="max-w-prose text-sm leading-6 text-muted-foreground">
        {{ description }}
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <UiButton class="rounded-xl transition-transform hover:-translate-y-0.5 hover:shadow-md" @click="emit('action')">
        {{ actionLabel }}
      </UiButton>
      <slot name="actions" />
    </div>
  </section>
</template>
