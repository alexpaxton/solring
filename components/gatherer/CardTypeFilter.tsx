import { Field } from 'components/gatherer/Field'
import { useFilters } from 'components/gatherer/FiltersContext'
import { Input } from 'components/gatherer/Inputs'
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
    <Field label="Type">
      <Input
        type="text"
        value={cardType}
        onChange={handleInputChange}
        placeholder="ex: enchantment"
      />
    </Field>
  )
}
