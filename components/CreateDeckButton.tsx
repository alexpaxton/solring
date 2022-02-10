import { CreateDeckForm } from 'components/CreateDeckForm'
import { Button, Modal, useModalState } from 'components/ui'
import { DeckPostBody } from 'types'
import { createDeck, useMe } from 'utils'

export const CreateDeckButton = () => {
  const { me, isLoading, isError } = useMe()
  const { modalState, openModal, closeModal } = useModalState()

  if (!me || isLoading || isError) {
    return null
  }

  async function handleSubmit(draftDeck: DeckPostBody) {
    closeModal()
    const resp = await createDeck(draftDeck)
    if (resp.error) {
      window.alert(resp.error)
    } else if (resp.deck) {
      window.alert(`${resp.deck.title} created!`)
    }
  }

  return (
    <>
      <Button onClick={openModal} variant="neutral">
        Create Deck
      </Button>
      <Modal
        isVisible={modalState}
        onMaskClick={closeModal}
        onEscapeKey={closeModal}
      >
        <CreateDeckForm onSubmit={handleSubmit} onDismiss={closeModal} />
      </Modal>
    </>
  )
}
