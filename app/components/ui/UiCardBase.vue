<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useSlots } from 'vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

interface Props {
  class?: HTMLAttributes['class']
  description?: string
  subtitle?: string
  title?: string
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
const slots = useSlots()
</script>

<template>
  <Card v-bind="{ ...props, ...$attrs }">
    <slot v-if="slots.header" name="header" />

    <CardHeader v-else-if="title || subtitle">
      <CardTitle v-if="title">{{ title }}</CardTitle>
      <CardDescription v-if="subtitle">{{ subtitle }}</CardDescription>
    </CardHeader>

    <CardContent v-if="slots.default || description">
      <slot v-if="slots.default" />
      <template v-else>{{ description }}</template>
    </CardContent>

    <CardFooter v-if="slots.footer">
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>
