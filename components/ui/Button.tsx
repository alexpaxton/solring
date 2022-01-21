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
  border: 0;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 700;
  outline: none;
  color: ${colors.n5};
  transition: color 0.25s ease, background-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    cursor: pointer;
  }
`

const PrimaryButton = styled(BaseButton)`
  background-color: ${colors.p0};
  color: ${colors.n7};

  &:hover {
    background-color: ${colors.p1};
  }
`

const SecondaryButton = styled(BaseButton)`
  background-color: ${colors.g0};
  color: ${colors.n7};

  &:hover {
    background-color: ${colors.g1};
  }
`

const DangerButton = styled(BaseButton)`
  background-color: ${colors.r0};
  color: ${colors.n7};

  &:hover {
    background-color: ${colors.r1};
  }
`

const NeutralButton = styled(BaseButton)`
  background-color: ${colors.n3};
  color: ${colors.n7};

  &:hover {
    background-color: ${colors.n4};
  }
`
