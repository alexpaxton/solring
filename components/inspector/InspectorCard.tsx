import { colors } from 'components/ui'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'

interface Props {
  card: Card | null
  cardFace: string
  setCardFace: (face: string) => void
}

export const InspectorCard: FC<Props> = ({ card, cardFace, setCardFace }) => {
  if (card === null) {
    return null
  }

  if (card.card_faces) {
    const frontImage = card?.card_faces[0].image_uris?.large
    const backImage = card?.card_faces[1].image_uris?.large

    return (
      <CardContainer className={cardFace}>
        <SmallCard
          className="front"
          style={{ backgroundImage: `url(${frontImage})` }}
          onClick={() => setCardFace('front')}
        />
        <SmallCard
          className="back"
          style={{ backgroundImage: `url(${backImage})` }}
          onClick={() => setCardFace('back')}
        />
      </CardContainer>
    )
  }

  const img = card?.image_uris?.large

  return (
    <CardContainer>
      <BigCard style={{ backgroundImage: `url(${img})` }} />
    </CardContainer>
  )
}

const CardContainer = styled.div`
  width: 400px;
  height: 600px;
  position: relative;

  .front {
    top: 0;
    left: 0;
  }

  .back {
    top: 50px;
    left: 50px;
  }
`

const CardBase = styled.div`
  position: relative;
  background-size: cover;
  background-position: center center;
`

const BigCard = styled(CardBase)`
  width: 400px;
  border-radius: ${Math.round(400 * 0.0628571)}px;
  height: ${Math.round(400 * 1.39666)}px;
  border: 2px solid ${colors.p2};
  box-shadow: 0 0 4px ${colors.p1}, 0 0 8px ${colors.p0};
`

const SmallCard = styled(CardBase)`
  border-radius: 22px;
  border-radius: ${Math.round(350 * 0.0628571)}px;
  position: absolute;
  width: 350px;
  height: ${Math.round(350 * 1.39666)}px;
  border: 2px solid transparent;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  .front &.front,
  .back &.back {
    z-index: 2;
    border-color: ${colors.p2};
    box-shadow: 0 0 4px ${colors.p1}, 0 0 8px ${colors.p0};
  }

  .front &.back,
  .back &.front {
    cursor: pointer;
  }
`
