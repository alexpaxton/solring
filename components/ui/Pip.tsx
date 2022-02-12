import styled from 'styled-components'
import * as colors from './colors'

export const Pip = styled.span`
  display: inline-flex;
  min-width: 24px;
  height: 24px;
  padding: 0 7px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.n1};
  font-size: 14px;
  font-weight: 600;
  color: ${colors.n4};

  &:first-child {
    margin-right: 10px;
  }

  &:last-child {
    margin-left: 10px;
  }
`
