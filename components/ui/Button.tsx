import * as colors from 'components/ui/colors'
import styled, { css } from 'styled-components'

export const Button = styled.button<{
  variant: 'primary' | 'secondary' | 'danger' | 'neutral'
}>`
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

  ${({ variant }) =>
    variant &&
    variants[variant] &&
    css`
      background-color: ${variants[variant].bg};
      &:not(.disabled):hover {
        background-color: ${variants[variant].bgHover};
      }
    `}
`

Button.displayName = 'Button'

const variants = {
  primary: {
    bg: colors.p1,
    bgHover: colors.p2,
  },
  secondary: {
    bg: colors.g1,
    bgHover: colors.g2,
  },
  danger: {
    bg: colors.r2,
    bgHover: colors.r3,
  },
  neutral: {
    bg: colors.n3,
    bgHover: colors.n4,
  },
}
