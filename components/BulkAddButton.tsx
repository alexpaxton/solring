import { BulkAddControlBar } from 'components/BulkAddControlBar'
import { BulkAddInput } from 'components/BulkAddInput'
import { BulkAddPreview } from 'components/BulkAddPreview'
import { useCards } from 'components/deck/CardsContext'
import { Button, colors, Dialog, Modal, useModalState } from 'components/ui'
import { FC, useState } from 'react'
import { Card, Cards } from 'scryfall-sdk'
import styled from 'styled-components'
import { getCardsFromResults, pluralizer } from 'utils'

export const BulkAddButton: FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [mode, setMode] = useState<'none' | 'fetching' | 'done'>('none')
  const [cardsList, setCardsList] = useState<Card[]>([])
  const { modalState, openModal, closeModal } = useModalState()
  const { addCards, isCardInDeck } = useCards()

  const validCards = cardsList.filter((c) => !isCardInDeck(c.name))

  const submitText =
    cardsList.length && mode === 'done'
      ? `Add ${pluralizer('Card', validCards.length, true)}`
      : 'Add Cards'

  function handleResetSearch() {
    setCardsList([])
    setMode('none')
  }

  function handleButtonClick() {
    setCardsList([])
    setInputValue('')
    setMode('none')
    openModal()
  }

  async function fetchCards() {
    setMode('fetching')
    const list = inputValue.split('\n').map((name) => ({ name }))
    const resp = Cards.collection(...list)
    const cards = await resp.waitForAll()
    const onlyCards = getCardsFromResults(cards)
    setCardsList(onlyCards)
    setMode('done')
  }

  function handleSubmit() {
    if (validCards.length) {
      closeModal()
      addCards(validCards)
    }
  }

  return (
    <>
      <Button variant="secondary" onClick={handleButtonClick}>
        Add from list
      </Button>
      <Modal isVisible={modalState}>
        <Dialog title="Add cards from list" onDismiss={closeModal}>
          <Main>
            <BulkAddControlBar
              mode={mode}
              onSearch={fetchCards}
              onReset={handleResetSearch}
              disableSearch={mode === 'fetching' || inputValue === ''}
              validCardsCount={validCards.length}
            />
            {mode === 'none' && (
              <BulkAddInput value={inputValue} onChange={setInputValue} />
            )}
            {mode === 'fetching' && (
              <SpinnerContainer>
                <p>Fetching...</p>
              </SpinnerContainer>
            )}
            {mode === 'done' && (
              <BulkAddPreview
                searchList={inputValue.split('\n')}
                foundList={cardsList}
              />
            )}
          </Main>
          <footer>
            <Button variant="neutral" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={handleSubmit}
              disabled={mode !== 'done' || !validCards.length}
            >
              {submitText}
            </Button>
          </footer>
        </Dialog>
      </Modal>
    </>
  )
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.n0};
  border: 2px solid ${colors.n2};
  border-radius: 6px;
`

const Main = styled.main`
  flex-direction: column;
`
