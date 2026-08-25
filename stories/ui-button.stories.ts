import type { Meta, StoryObj } from '@storybook/vue3-vite'

import UiButton from '../app/components/ui/UiButton.vue'

const meta = {
  title: 'UI/Button',
  component: UiButton,
  args: {
    variant: 'default',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'],
    },
  },
  render: (args) => ({
    components: { UiButton },
    setup: () => ({ args }),
    template: '<UiButton v-bind="args">Save changes</UiButton>',
  }),
} satisfies Meta<typeof UiButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}
