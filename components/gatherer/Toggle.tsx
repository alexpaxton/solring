import { Black, Blue, colors, Green, Red, White } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  active: boolean
  onToggle: (active: boolean) => void
  color: 'w' | 'u' | 'b' | 'r' | 'g'
}

export const Toggle: FC<Props> = ({ active, onToggle, color }) => {
  let children: React.ReactNode

  switch (color) {
    case 'w':
      children = <White size={20} />
      break
    case 'u':
      children = <Blue size={20} />
      break
    case 'b':
      children = <Black size={20} />
      break
    case 'r':
      children = <Red size={20} />
      break
    case 'g':
      children = <Green size={20} />
      break
  }

  function handleClick() {
    onToggle(!active)
  }
  return (
    <Box onClick={handleClick} className={active ? 'active' : undefined}>
      {children}
    </Box>
  )
}

const Box = styled.div`
  width: 32px;
  height: 32px;
  position: relative;

  &:after,
  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.25s ease;
  }

  &:after {
    content: '';
    width: 24px;
    height: 24px;
    background-color: ${colors.p1};
    border-radius: 50%;
    opacity: 0;
    z-index: 1;
  }

  & > svg {
    opacity: 0.28;
    z-index: 2;
  }

  &:hover {
    cursor: pointer;
  }

  &:hover:after {
    opacity: 1;
  }

  &.active > svg {
    opacity: 1;
  }
`
