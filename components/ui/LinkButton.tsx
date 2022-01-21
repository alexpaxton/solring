import { FC } from 'react'
import { StandardProps } from 'types'
import {
  DangerButton,
  NeutralButton,
  PrimaryButton,
  SecondaryButton,
} from './Button'

interface LinkButtonProps extends StandardProps {
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'neutral'
  href: string
}

export const LinkButton: FC<LinkButtonProps> = ({ variant, ...props }) => {
  switch (variant) {
    case 'primary':
      return <PrimaryButton {...props} as="a" />
    case 'secondary':
      return <SecondaryButton {...props} as="a" />
    case 'danger':
      return <DangerButton {...props} as="a" />
    case 'neutral':
    default:
      return <NeutralButton {...props} as="a" />
  }
}

LinkButton.defaultProps = {
  disabled: false,
  variant: 'neutral',
}
