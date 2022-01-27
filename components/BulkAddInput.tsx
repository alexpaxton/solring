import { Textarea } from 'components/ui'
import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'

interface Props {
  value: string
  onChange: (value: string) => void
}

export const BulkAddInput: FC<Props> = ({ value, onChange }) => {
  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value)
  }

  return (
    <ListInput
      value={value}
      onChange={handleInputChange}
      placeholder="Separate cards with a new line, names are case-sensitive"
      spellCheck={false}
    />
  )
}

const ListInput = styled(Textarea)`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 500px;
`
