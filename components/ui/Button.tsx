import * as colors from 'components/ui/colors'
import { FC, MouseEvent } from 'react'
import styled from 'styled-components'
import { StandardProps } from 'types'

interface ButtonProps extends StandardProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  id?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'neutral'
}

export const Button: FC<ButtonProps> = ({ variant, ...props }) => {
  switch (variant) {
    case 'primary':
      return <PrimaryButton {...props} />
    case 'secondary':
      return <SecondaryButton {...props} />
    case 'danger':
      return <DangerButton {...props} />
    case 'neutral':
    default:
      return <NeutralButton {...props} />
  }
}

Button.defaultProps = {
  disabled: false,
  variant: 'neutral',
  type: 'button',
}

const BaseButton = styled.button`
  border-radius: 4px;
  height: 32px;
  line-height: 32px;
  border: 0;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 700;
  outline: none;
  text-decoration: none;
  transition: color 0.25s ease, background-color 0.25s ease,
    box-shadow 0.25s ease;

  &,
  &:link,
  &:active,
  &:visited {
    color: ${colors.n7};
  }

  &:hover {
    text-decoration: none;
    color: ${colors.n7};
    cursor: pointer;
  }
`

export const PrimaryButton = styled(BaseButton)`
  background-color: ${colors.p0};

  &:hover {
    background-color: ${colors.p1};
  }
`

export const SecondaryButton = styled(BaseButton)`
  background-color: ${colors.g0};

  &:hover {
    background-color: ${colors.g1};
  }
`

export const DangerButton = styled(BaseButton)`
  background-color: ${colors.r0};

  &:hover {
    background-color: ${colors.r1};
  }
`

export const NeutralButton = styled(BaseButton)`
  background-color: ${colors.n3};

  &:hover {
    background-color: ${colors.n4};
  }
`
