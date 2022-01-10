import styled from 'styled-components'

export const CardGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 8px;

  &:before {
    content: "";
    width: 0;
    padding-bottom: calc(680 / 488 * 100%);
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`