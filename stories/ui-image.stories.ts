import type { Meta, StoryObj } from '@storybook/vue3-vite'

import UiImage from '../app/components/ui/UiImage.vue'

const sampleImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"%3E%3Crect width="1200" height="800" fill="%230ea5e9"/%3E%3Cpath fill="%23bae6fd" d="M0 550 310 260l220 220 170-150 500 470H0Z"/%3E%3C/svg%3E'

const meta = {
  title: 'Components/Image',
  component: UiImage,
  args: {
    alt: 'A blue mountain illustration',
    class: 'h-auto w-full rounded-lg object-cover',
    height: 800,
    sizes: '100vw md:50vw lg:600px',
    src: sampleImage,
    width: 1200,
  },
} satisfies Meta<typeof UiImage>

export default meta

type Story = StoryObj<typeof meta>

export const Loaded: Story = {}

export const Loading: Story = {
  render: (args) => ({
    components: { UiImage },
    setup: () => ({ args }),
    template: '<UiImage v-bind="args" data-story-state="loading" />',
  }),
}

export const Error: Story = {
  render: (args) => ({
    components: { UiImage },
    setup: () => ({ args }),
    template: '<UiImage v-bind="args" data-story-state="error" />',
  }),
}

export const CustomFallback: Story = {
  render: (args) => ({
    components: { UiImage },
    setup: () => ({ args }),
    template: `
      <UiImage v-bind="args" data-story-state="error">
        <template #fallback>
          <p class="p-6 text-sm font-medium">The image is unavailable.</p>
        </template>
      </UiImage>
    `,
  }),
}

export const Ratio: Story = {
  args: {
    height: undefined,
    ratio: 16 / 9,
    width: undefined,
  },
}

export const Decorative: Story = {
  args: {
    alt: '',
  },
}

export const NativeAttributesAndObjectFit: Story = {
  args: {
    class: 'h-48 w-full rounded-lg object-contain bg-muted',
    decoding: 'async',
    'data-image-usage': 'storybook',
    loading: 'lazy',
  },
}
