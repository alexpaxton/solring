import { useDeck } from 'components/deck/DeckContext'
import {
  FC, MouseEvent
} from 'react'
import styled from 'styled-components'
import { DeckViewMode } from 'types'
import { classnames } from 'utils'

const options = [
  'grid', 'curve', 'type'
]

export const DeckModeToggle: FC = () => {
  const {
    mode, setMode 
  } = useDeck()

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement
    const name = target.id as DeckViewMode

    setMode(name)
  }

  function getClassName(option: string): string {
    return classnames('', { active: mode === option })
  }

  return (
    <Container>
      {options.map(option => <Option key={`view-mode__${option}`} id={option} onClick={handleClick} type="button" className={getClassName(option)}>{option}</Option>)}
    </Container>
  )
}

const buttonSize = 70

const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 40px;
  flex: 0 0 ${buttonSize * options.length}px;
  margin-left: 30px;
`

const Option = styled.button`
  font-size: 14px;
  font-weight: 700;
  width: ${buttonSize}px;
  flex: 0 0 ${buttonSize}px;
  border: 0;
  background-color: #eee;
  cursor: pointer;
  text-transform: capitalize;

  &.active {
    background-color: #000;
    color: #fff;
  }
`