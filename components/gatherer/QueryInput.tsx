import { colors, Input } from 'components/ui'
import { useFilters } from 'contexts'
import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { SearchAlt } from 'styled-icons/boxicons-regular'

export const QueryInput: FC = () => {
  const { queryText, dispatch } = useFilters()

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'updateQueryText',
      payload: { queryText: e.target.value },
    })
  }

  return (
    <Container>
      <BigInput
        value={queryText}
        placeholder="Search by keyword..."
        type="text"
        onChange={handleInputChange}
        spellCheck={false}
      />
      <SearchAlt />
    </Container>
  )
}

const Container = styled.div`
  flex: 1 0 0;
  position: relative;
  height: 46px;

  > svg {
    width: 22px;
    height: 22px;
    position: absolute;
    top: 50%;
    left: 14px;
    z-index: 2;
    transform: translateY(-48%);
    fill: ${colors.n3};
    transition: fill 0.25s ease;
  }
`

const BigInput = styled(Input)`
  width: 100%;
  height: 46px;
  font-size: 16px;
  padding: 0 18px 0 42px;
  z-index: 1;

  &:hover + svg {
    fill: ${colors.n4};
  }

  &:focus + svg {
    fill: ${colors.p3};
  }
`
