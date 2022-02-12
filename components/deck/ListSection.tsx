import { colors, Pip } from 'components/ui'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'

interface Props {
  cards: Card[]
  title: string
}

export const ListSection: FC<Props> = ({ cards, title }) => {
  return (
    <Section>
      <Heading>
        <span>{title}</span>
        <Pip>{cards.length}</Pip>
      </Heading>
      <Table>
        {cards.map((card) => (
          <>
            <Item>1</Item>
            <Item key={card.id}>{card.name}</Item>
            <Item />
          </>
        ))}
      </Table>
    </Section>
  )
}

const Heading = styled.h4`
  margin: 30px 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: ${colors.n6};
  padding-bottom: 18px;
  border-bottom: 2px solid ${colors.n1};
`

const Section = styled.section`
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;

  &:nth-child(1) ${Heading} {
    margin-top: 0;
  }

  @media screen and (min-width: 800px) {
    flex: 0 0 50%;

    &:nth-child(1) ${Heading}, &:nth-child(2) ${Heading} {
      margin-top: 0;
    }
  }

  @media screen and (min-width: 1200px) {
    flex: 0 0 33.3333%;

    &:nth-child(1)
      ${Heading},
      &:nth-child(2)
      ${Heading},
      &:nth-child(3)
      ${Heading} {
      margin-top: 0;
    }
  }

  @media screen and (min-width: 1600px) {
    flex: 0 0 25%;

    &:nth-child(1)
      ${Heading},
      &:nth-child(2)
      ${Heading},
      &:nth-child(3)
      ${Heading},
      &:nth-child(4)
      ${Heading} {
      margin-top: 0;
    }
  }
`

const Table = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr 60px;
  grid-column-gap: 12px;
  grid-row-gap: 6px;
  padding-left: 30px;
`

const Item = styled.p`
  font-size: 14px;
  line-height: 14px;
`
