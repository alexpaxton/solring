import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  active: boolean
  onToggle: (active: boolean) => void
}

export const Toggle: FC<Props> = ({
  active, onToggle, children 
}) => {
  function handleClick() {
    onToggle(!active)
  }
  return <Box onClick={handleClick} className={active ? 'active' : undefined}>{children}</Box>
}

const Box = styled.div`
  width: 32px;
  height: 32px;
  line-height: 32px;
  background-color: #eee;
  text-align: center;

  &:hover {
    cursor: pointer;
  }

  &.active {
    background-color: #000;
    color: #fff;
  }
`