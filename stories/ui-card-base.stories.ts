import type { Meta, StoryObj } from '@storybook/vue3-vite'

import UiCardBase from '../app/components/ui/UiCardBase.vue'
import UiButton from '../app/components/ui/UiButton.vue'

const meta = {
  title: 'UI/Card Base',
  component: UiCardBase,
  args: {
    description: 'Use the default description for concise supporting content in a reusable Card.',
    subtitle: 'A flexible building block',
    title: 'Keep your content organized',
  },
} satisfies Meta<typeof UiCardBase>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TitleOnly: Story = {
  args: {
    description: undefined,
    subtitle: undefined,
    title: 'A Card without empty sections',
  },
}

export const CustomSlots: Story = {
  args: {
    description: undefined,
    subtitle: undefined,
    title: undefined,
  },
  render: (args) => ({
    components: { UiButton, UiCardBase },
    setup: () => ({ args }),
    template: `
      <UiCardBase v-bind="args" aria-label="Custom Card example" data-story="custom-slots">
        <template #header>
          <div class="space-y-1 px-6">
            <p class="text-sm font-medium text-primary">Custom header</p>
            <h3 class="font-semibold">Tailor every Card region</h3>
          </div>
        </template>
        <p class="text-sm leading-6 text-muted-foreground">
          Default slot content replaces the generated description.
        </p>
        <template #footer>
          <UiButton variant="outline">Learn more</UiButton>
        </template>
      </UiCardBase>
    `,
  }),
}
