import type { Meta, StoryObj } from '@storybook/vue3-vite'

import BlockActionCard from '../app/components/blocks/BlockActionCard.vue'

const meta = {
  title: 'Blocks/Action Card',
  component: BlockActionCard,
  args: {
    actionLabel: 'Review settings',
    description: 'Use this generic composition for a focused next step in a marketing or admin surface.',
    eyebrow: 'Next step',
    title: 'Keep your workspace ready',
  },
} satisfies Meta<typeof BlockActionCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Admin: Story = {
  args: {
    actionLabel: 'Invite member',
    description: 'Use the same block as an admin surface without bringing business data or permissions into Base.',
    eyebrow: 'Team access',
    title: 'Your workspace is ready for collaborators',
  },
}
