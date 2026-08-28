<script setup lang="ts">
import { ImageOff } from '@lucide/vue'
import type { CSSProperties, HTMLAttributes } from 'vue'
import { nextTick, onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils'

type ImageState = 'error' | 'loaded' | 'loading'

interface NuxtImageInstance {
  imgEl?: HTMLImageElement | null
}

interface Props {
  alt: string
  class?: HTMLAttributes['class']
  height?: number
  ratio?: number
  sizes?: string
  src: string
  width?: number
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
const emit = defineEmits<{
  error: [event: Event | string]
  load: [event: Event]
}>()

const image = ref<NuxtImageInstance | null>(null)
const state = ref<ImageState>('loading')
const sourceVersion = ref(0)

const rootStyle = (): CSSProperties | undefined => {
  if (props.ratio === undefined) {
    return undefined
  }

  return { aspectRatio: String(props.ratio) }
}

function isCurrentImageEvent(event: Event | string) {
  if (typeof event === 'string' || !(event.target instanceof HTMLImageElement)) {
    return true
  }

  return event.target.dataset.uiImageSource === String(sourceVersion.value)
}

function onLoad(event: Event) {
  if (!isCurrentImageEvent(event)) {
    return
  }

  state.value = 'loaded'
  emit('load', event)
}

function onError(event: Event | string) {
  if (!isCurrentImageEvent(event)) {
    return
  }

  state.value = 'error'
  emit('error', event)
}

function synchronizeCachedImage() {
  if (state.value !== 'loading') {
    return
  }

  const imageElement = image.value?.imgEl

  if (!imageElement?.complete) {
    return
  }

  if (imageElement.naturalWidth > 0) {
    onLoad(new Event('load'))
    return
  }

  onError(new Event('error'))
}

watch(
  () => props.src,
  () => {
    sourceVersion.value += 1
    state.value = 'loading'
    void nextTick(synchronizeCachedImage)
  },
)

onMounted(() => {
  void nextTick(synchronizeCachedImage)
})
</script>

<template>
  <div
    :aria-busy="state === 'loading' ? true : undefined"
    :class="cn('relative max-w-full', ratio !== undefined && 'overflow-hidden')"
    :data-state="state"
    :style="rootStyle()"
  >
    <NuxtImg
      v-if="state !== 'error'"
      ref="image"
      :key="sourceVersion"
      v-bind="$attrs"
      :alt="alt"
      :class="cn('block max-w-full', ratio !== undefined && 'size-full', props.class)"
      :data-ui-image-source="sourceVersion"
      :height="height"
      :sizes="sizes"
      :src="src"
      :width="width"
      @error="onError"
      @load="onLoad"
    />

    <div v-if="state === 'loading'" aria-hidden="true" class="pointer-events-none absolute inset-0 bg-muted" />

    <div
      v-else-if="state === 'error'"
      :aria-label="alt || undefined"
      :role="alt ? 'img' : undefined"
      class="flex size-full min-h-16 items-center justify-center bg-muted text-muted-foreground"
    >
      <slot name="fallback" :state="state">
        <ImageOff aria-hidden="true" class="size-6" />
      </slot>
    </div>
  </div>
</template>
