import * as colors from 'components/ui/colors'
import styled from 'styled-components'

export const Input = styled.input`
  position: relative;
  z-index: 1;
  border-radius: 4px;
  height: 32px;
  background-color: ${colors.n0};
  border: 2px solid ${colors.n2};
  font-size: 14px;
  font-weight: 500;
  padding: 0 11px 2px 11px;
  outline: none;
  color: ${colors.n6};
  transition: border-color 0.25s ease, color 0.25s ease,
    background-color 0.25s ease, box-shadow 0.25s ease;

  &::placeholder {
    color: ${colors.n3};
    font-style: italic;
    transition: color 0.25s ease;
  }

  &:hover {
    border-color: ${colors.p1};
    color: ${colors.n7};
    z-index: 2;
  }

  &:hover::placeholder {
    color: ${colors.n4};
  }

  &:focus {
    z-index: 2;
    border-color: ${colors.p1};
    color: ${colors.n7};
    background-color: ${colors.n0};
    box-shadow: 0 0 7px 1px ${colors.p0}, 0 0 3px 0 ${colors.p1};
    text-shadow: 0 0 4px ${colors.p1};
  }

  &:focus::placeholder {
    color: ${colors.p3};
  }
`
