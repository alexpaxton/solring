import { colors } from 'components/ui'
import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  padding: 18px 30px;
  border-bottom: 2px solid ${colors.n1};
`

export const ControlBar = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 30px;
  border-bottom: 2px solid ${colors.n1};

  > * {
    margin-right: 16px;
  }

  > *:last-child {
    margin-right: 0;
  }
`
