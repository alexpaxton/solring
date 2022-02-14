import { InspectorActions } from 'components/inspector/InspectorActions'
import { InspectorCard } from 'components/inspector/InspectorCard'
import { colors, Modal } from 'components/ui'
import { useInspector } from 'contexts'
import { FC, MouseEvent, useRef, useState } from 'react'
import { Card, Legalities } from 'scryfall-sdk'
import styled from 'styled-components'
import { CheckCircle, XCircle } from 'styled-icons/boxicons-regular'
import { capitalize } from 'utils'

// Assigning inspectedCard to a ref so that it will still be visible
// while the modal transitions out

export const Inspector: FC = () => {
  const { inspectedCard, dismissInspector } = useInspector()
  const [cardFace, setCardFace] = useState<string>('front')
  const cardRef = useRef<Card | null>(null)

  if (inspectedCard) {
    cardRef.current = inspectedCard
  }

  function handleClick(e: MouseEvent) {
    e.stopPropagation()
  }

  return (
    <Modal
      isVisible={!!inspectedCard}
      onDismiss={dismissInspector}
      onEscapeKey={dismissInspector}
    >
      <Container onClick={handleClick}>
        <InspectorCard
          card={cardRef.current}
          cardFace={cardFace}
          setCardFace={setCardFace}
        />
        <CardDetails>
          <CardName>{cardRef.current?.name}</CardName>
          <OracleText cardFace={cardFace} card={cardRef.current} />
          <FlavorText cardFace={cardFace} card={cardRef.current} />
          <Legality ruling={inspectedCard?.legalities} />
          <InspectorActions />
        </CardDetails>
      </Container>
    </Modal>
  )
}

interface OracleTextProps {
  card: Card | null
  cardFace: string
}

const OracleText: FC<OracleTextProps> = ({ card, cardFace }) => {
  let text
  if (card?.card_faces) {
    text =
      cardFace === 'front'
        ? card.card_faces[0].oracle_text
        : card.card_faces[1].oracle_text
  } else {
    text = card?.oracle_text
  }

  return text ? <OracleP>{text}</OracleP> : null
}

interface FlavorTextProps {
  card: Card | null
  cardFace: string
}

const FlavorText: FC<FlavorTextProps> = ({ card, cardFace }) => {
  let text
  if (card?.card_faces) {
    text =
      cardFace === 'front'
        ? card.card_faces[1].flavor_text
        : card.card_faces[0].flavor_text
  } else {
    text = card?.flavor_text
  }

  return text ? <FlavorP>{text}</FlavorP> : null
}

interface LegalityProps {
  ruling?: Legalities
}

const Legality: FC<LegalityProps> = ({ ruling }) => {
  if (ruling === undefined) {
    return null
  }

  const isIllegal = ruling.commander !== 'legal'
  const className = isIllegal ? 'illegal' : 'legal'

  return (
    <LegalityP className={className}>
      {isIllegal ? <XCircle /> : <CheckCircle />}
      {`${capitalize(ruling.commander.replace(/_/g, ' '))} in commander format`}
    </LegalityP>
  )
}

const Container = styled.div`
  display: flex;
`

const CardName = styled.h6`
  font-size: 22px;
  font-weight: 300;
  margin: 0 0 1.5em 0;
`

const OracleP = styled.p`
  margin: 0 0 16px 0;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
`

const FlavorP = styled.p`
  margin: 0 0 16px 0;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  font-style: italic;
`

const LegalityP = styled.p`
  margin: 0 0 16px 0;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  color: ${colors.g2};
  display: flex;
  align-items: center;

  svg {
    font-size: 1.5em;
    width: 1em;
    height: 1em;
    margin-right: 0.5em;
  }

  &.illegal {
    color: ${colors.r2};
  }
`

const CardDetails = styled.div`
  margin-left: 32px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: ${colors.n7};
`
