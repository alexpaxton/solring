import { colors } from 'components/ui'
import { useLayoutMode } from 'contexts'
import { FC } from 'react'
import styled from 'styled-components'

export const LayoutModeToggle: FC = () => {
  const { mode, setMode } = useLayoutMode()

  function getClassName(m: string) {
    if (m === mode) {
      return 'active'
    }
  }

  return (
    <Container>
      <Option className={getClassName('type')} onClick={() => setMode('type')}>
        Type
      </Option>
      <Option className={getClassName('cmc')} onClick={() => setMode('cmc')}>
        CMC
      </Option>
      <Option
        className={getClassName('color')}
        onClick={() => setMode('color')}
      >
        Color
      </Option>
    </Container>
  )
}

const Container = styled.ul`
  display: flex;
  align-items: stretch;
  height: 32px;
  list-style: none;
  padding: 2px;
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 4px;
  background-color: ${colors.n1};
`

const Option = styled.li`
  display: flex;
  align-items: center;
  margin: 0;
  color: ${colors.n4};
  padding: 0 12px;
  font-size: 13px;
  font-weight: 700;
  margin: 2px;
  border-radius: 2px;
  transition: color 0.25s ease, background-color 0.25s ease;

  &:hover {
    background-color: ${colors.n2};
    color: ${colors.n6};
    cursor: pointer;
  }

  &.active {
    background-color: ${colors.n3};
    color: ${colors.n7};
  }
`
