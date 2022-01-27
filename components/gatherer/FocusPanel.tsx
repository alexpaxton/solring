import { MagicCard } from 'components/cards/MagicCard'
import { AddCardToDeckButton } from 'components/gatherer/AddCardToDeckButton'
import { colors } from 'components/ui'
import { useFocusedCard } from 'contexts'
import { FC } from 'react'
import styled from 'styled-components'
import { useMe } from 'utils'

export const FocusPanel: FC = () => {
  const { focusedCard, setFocusedCard } = useFocusedCard()
  const { me, isError } = useMe()

  let actions = <></>

  if (focusedCard === null) {
    return null
  }

  if (!isError && me) {
    actions = (
      <Actions>
        <p>Add card to:</p>
        {me.decks.map((deck) => (
          <AddCardToDeckButton
            key={`add-to_${deck.id}`}
            deckId={deck.id}
            deckTitle={deck.title}
            cardId={focusedCard.id}
            cardTitle={focusedCard.name}
          />
        ))}
      </Actions>
    )
  }

  const { name, oracle_text } = focusedCard

  return (
    <SidePanel>
      <X onClick={() => setFocusedCard(null)} />
      <StyledMagicCard card={focusedCard} highRes={true} />
      <p>{name}</p>
      <p>{oracle_text}</p>
      {actions}
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
  border-left: 2px solid ${colors.n1};
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

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 2px solid ${colors.n1};
  margin-top: 32px;
  padding-top: 32px;
  text-align: center;

  > * {
    margin-bottom: 4px;
  }
`
