<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useSlots } from 'vue'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

interface Props {
  description?: string
  subtitle?: string
  title?: string
  class?: HTMLAttributes['class']
  ui?: {
    content?: HTMLAttributes['class']
    description?: HTMLAttributes['class']
    footer?: HTMLAttributes['class']
    header?: HTMLAttributes['class']
    subtitle?: HTMLAttributes['class']
    title?: HTMLAttributes['class']
  }
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
const slots = useSlots()
</script>

<template>
  <Card :class="cn('shadow-3', props?.class)" v-bind="$attrs">
    <slot v-if="slots.header" name="header" />

    <CardHeader v-else-if="title || subtitle" :class="ui?.header">
      <CardTitle v-if="title" :class="cn('line-clamp-1 wrap-anywhere', ui?.title)">
        {{ title }}
      </CardTitle>
      <CardDescription v-if="subtitle" :class="cn('line-clamp-1 wrap-anywhere', ui?.subtitle)">
        {{ subtitle }}
      </CardDescription>
    </CardHeader>

    <CardContent v-if="slots.default || description" :class="ui?.content">
      <slot v-if="slots.default" />
      <p v-else :class="cn('line-clamp-3 wrap-anywhere', ui?.description)">
        {{ description }}
      </p>
    </CardContent>

    <CardFooter v-if="slots.footer" :class="ui?.footer">
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>
