import { MagicCard } from 'components/cards/MagicCard'
import { useSearchResults } from 'components/gatherer/SearchContext'
import { FC } from 'react'
import styled from 'styled-components'

export const FocusPanel: FC = () => {
  const { focusedCard, setFocusedCard } = useSearchResults()

  if (focusedCard === null) {
    return null
  }

  const { name, oracle_text } = focusedCard

  return (
    <SidePanel>
      <X onClick={() => setFocusedCard(null)} />
      <StyledMagicCard {...focusedCard} highRes={true} />
      <p>{name}</p>
      <p>{oracle_text}</p>
    </SidePanel>
  )
}

const SidePanel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-left: 1px solid #eee;
`

const StyledMagicCard = styled(MagicCard)`
  padding-bottom: calc(680 / 488 * 100%);
`

const X = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  &:before,
  &:after {
    content: '';
    width: 18px;
    height: 2px;
    background-color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`
