import * as colors from 'components/ui/colors'
import { FC, MouseEvent } from 'react'
import styled from 'styled-components'
import { StandardProps } from 'types'
import { classnames } from 'utils'

interface ButtonProps extends StandardProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  id?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'neutral'
}

export const Button: FC<ButtonProps> = ({
  variant = 'neutral',
  className,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const buttonClass = classnames(className, { disabled })
  switch (variant) {
    case 'primary':
      return (
        <PrimaryButton
          className={buttonClass}
          disabled={disabled}
          type={type}
          {...props}
        />
      )
    case 'secondary':
      return (
        <SecondaryButton
          className={buttonClass}
          disabled={disabled}
          type={type}
          {...props}
        />
      )
    case 'danger':
      return (
        <DangerButton
          className={buttonClass}
          disabled={disabled}
          type={type}
          {...props}
        />
      )
    case 'neutral':
    default:
      return (
        <NeutralButton
          className={buttonClass}
          disabled={disabled}
          type={type}
          {...props}
        />
      )
  }
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
    box-shadow 0.25s ease, opacity 0.25s ease;

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

  &.disabled,
  &[disabled],
  &[disabled]:hover,
  &.disabled:hover,
  &[disabled]:active,
  &.disabled:active {
    cursor: default;
    opacity: 0.5;
  }
`

export const PrimaryButton = styled(BaseButton)`
  background-color: ${colors.p0};

  &:not(.disabled):hover {
    background-color: ${colors.p1};
  }
`

export const SecondaryButton = styled(BaseButton)`
  background-color: ${colors.g0};

  &:not(.disabled):hover {
    background-color: ${colors.g1};
  }
`

export const DangerButton = styled(BaseButton)`
  background-color: ${colors.r0};

  &:not(.disabled):hover {
    background-color: ${colors.r1};
  }
`

export const NeutralButton = styled(BaseButton)`
  background-color: ${colors.n3};

  &:not(.disabled):hover {
    background-color: ${colors.n4};
  }
`
