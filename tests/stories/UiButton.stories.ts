import { UiButton } from '../../src/shared/ui'
import { ButtonVariant, ButtonSize } from '../../src/shared/ui'

export default {
  component: UiButton,
  title: 'shared/ui/UiButton',
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(ButtonVariant),
    },
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
    },
    onlyIcon: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export const Primary = {
  args: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Default,
    default: 'Primary Button',
  },
}

export const Secondary = {
  args: {
    variant: ButtonVariant.Secondary,
    size: ButtonSize.Default,
    default: 'Secondary Button',
  },
}

export const Tertiary = {
  args: {
    variant: ButtonVariant.Tertiary,
    size: ButtonSize.Default,
    default: 'Tertiary Button',
  },
}

export const Small = {
  args: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Small,
    default: 'Small',
  },
}

export const Disabled = {
  args: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Default,
    default: 'Disabled',
    disabled: true,
  },
}

export const IconOnly = {
  args: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Default,
    onlyIcon: true,
  },
}