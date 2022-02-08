import * as colors from 'components/ui/colors'
import styled, { css } from 'styled-components'

export const Button = styled.button<{
  variant: 'primary' | 'secondary' | 'danger' | 'neutral'
}>`
  border-radius: 4px;
  height: 32px;
  line-height: 32px;
  border: 0;
  border-bottom: 2px solid transparent;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 700;
  outline: none;
  text-decoration: none;
  transition: color 0.25s ease, background-color 0.25s ease,
    box-shadow 0.25s ease, opacity 0.25s ease, border-color 0.25s ease;

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

  &[disabled],
  &[disabled]:hover,
  &[disabled]:active {
    cursor: default;
    opacity: 0.5;
    color: ${colors.n0};
  }

  ${({ variant }) =>
    variant &&
    variants[variant] &&
    css`
      background-color: ${variants[variant].bg};
      border-color: ${variants[variant].border};
      &:hover {
        background-color: ${variants[variant].bgHover};
        border-color: ${variants[variant].borderHover};
      }
      &[disabled]:hover {
        background-color: ${variants[variant].bg};
        border-color: ${variants[variant].border};
      }
    `}
`

Button.displayName = 'Button'

const variants = {
  primary: {
    bg: colors.p1,
    bgHover: colors.p2,
    border: colors.p0,
    borderHover: colors.p1,
  },
  secondary: {
    bg: colors.g1,
    bgHover: colors.g2,
    border: colors.g0,
    borderHover: colors.g1,
  },
  danger: {
    bg: colors.r2,
    bgHover: colors.r3,
    border: colors.r1,
    borderHover: colors.r2,
  },
  neutral: {
    bg: colors.n3,
    bgHover: colors.n4,
    border: colors.n2,
    borderHover: colors.n3,
  },
}
