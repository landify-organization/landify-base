<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from './button'
import Button from './button/Button.vue'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  class: undefined,
  size: 'default',
  variant: 'default',
})
</script>

<template>
  <Button v-bind="{ ...props, ...$attrs }">
    <slot />
  </Button>
</template>
