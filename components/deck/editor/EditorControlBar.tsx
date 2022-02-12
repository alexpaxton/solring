import { ControlBar } from 'components/deck/DeckElements'
import { BulkAddButton } from 'components/deck/editor/BulkAddButton'
import { SearchWidget } from 'components/deck/editor/SearchWidget'
import { LayoutDisplayToggle } from 'components/deck/LayoutDisplayToggle'
import { LayoutModeToggle } from 'components/deck/LayoutModeToggle'
import { FC } from 'react'

export const EditorControlbar: FC = () => {
  return (
    <ControlBar>
      <LayoutModeToggle />
      <LayoutDisplayToggle />
      <BulkAddButton />
      <SearchWidget />
    </ControlBar>
  )
}
