import { useFilters } from 'components/gatherer/FiltersContext'
import { Input, InputGroup } from 'components/ui'
import { ChangeEvent, FC } from 'react'

export const CardTypeFilter: FC = () => {
  const { cardType, dispatch } = useFilters()

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'updateType',
      payload: { cardType: e.target.value },
    })
  }

  return (
    <InputGroup label="Type">
      <Input
        type="text"
        value={cardType}
        onChange={handleInputChange}
        placeholder="ex: enchantment"
        spellCheck={false}
      />
    </InputGroup>
  )
}
