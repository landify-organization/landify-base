<script setup lang="ts">
import type { ImgHTMLAttributes } from 'vue'
import { onMounted, useAttrs } from 'vue'

interface Props {
  alt?: string
  height?: number
  sizes?: string
  src?: string
  width?: number
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
const emit = defineEmits<{
  error: [event: Event]
  load: [event: Event]
}>()
const attrs = useAttrs()
const imageAttrs = attrs as ImgHTMLAttributes

onMounted(() => {
  const state = attrs['data-story-state']

  if (state === 'loading') {
    return
  }

  queueMicrotask(() => {
    emit(state === 'error' ? 'error' : 'load', new Event(state === 'error' ? 'error' : 'load'))
  })
})
</script>

<template>
  <img
    v-bind="imageAttrs"
    :alt="props.alt"
    :height="props.height"
    :sizes="props.sizes"
    :src="props.src"
    :width="props.width"
  />
</template>
