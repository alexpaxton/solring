import { colors } from 'components/ui'
import styled from 'styled-components'

export const FilterBox = styled.div`
  height: 32px;
  border-radius: 16px;
  background-color: ${colors.n2};
  display: flex;
  align-items: center;
  padding-left: 11px;
  transition: background-color 0.25s ease, color 0.25s ease;
  color: ${colors.n5};
  cursor: default;

  > span {
    font-weight: 500;
    font-size: 13px;
    line-height: 32px;
    margin-right: 11px;
    text-transform: uppercase;
    cursor: inherit;
  }
`

export const FilterPill = styled(FilterBox)`
  cursor: pointer;
  &:hover {
    background-color: ${colors.p1};
    color: ${colors.n7};
  }
`

export const FilterX = styled.button`
  border: 0;
  width: 24px;
  height: 24px;
  background-color: ${colors.n2};
  outline: none;
  border-radius: 12px;
  margin-right: 4px;
  padding: 0;
  color: ${colors.n4};
  transition: color 0.25s ease, background-color 0.25s ease;

  svg {
    width: 18px;
    height: 18px;
    position: relative;
    top: -1px;
    fill: currentColor;
  }

  &:hover {
    color: ${colors.n7};
    background-color: ${colors.r2};
  }
`
