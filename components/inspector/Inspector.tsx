import { Modal } from 'components/ui'
import { useInspector } from 'contexts'
import { FC } from 'react'

export const Inspector: FC = () => {
  const { inspectedCard, dismissInspector } = useInspector()

  return (
    <Modal isVisible={!!inspectedCard} onMaskClick={dismissInspector}>
      <p onClick={dismissInspector}>{inspectedCard?.name}</p>
    </Modal>
  )
}
