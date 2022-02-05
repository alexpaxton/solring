import { Card, Color } from 'scryfall-sdk'
import { DeckSlice, Layout, LayoutCard, LayoutHeading, LayoutMode } from 'types'

export function sliceDeck(mode: LayoutMode, cards: Card[]) {
  switch (mode) {
    case 'type':
      return sliceDeckByType(cards)
    case 'color':
      return sliceDeckByColor(cards)
    case 'cmc':
      return sliceDeckByCMC(cards)
    default:
      throw new Error(`${mode} is not a valid mode for slicing a deck`)
  }
}

export function getCardType(cardType: string): string {
  let type = cardType
    .replace('Legendary ', '')
    .replace(/([\w\s]+)\s—\s(.+)/g, '$1')

  if (type.includes('Land')) {
    type = 'Land'
  }
  return type
}

const humanFriendlyColors: Record<Color, string> = {
  W: 'White',
  U: 'Blue',
  B: 'Black',
  R: 'Red',
  G: 'Green',
}

export function getCardColor(colors: Color[]): string {
  const results = colors.map((color) => humanFriendlyColors[color])
  return results.length ? results.join(' / ') : 'Colorless'
}

export function sliceDeckByCMC(cards: Card[]): DeckSlice {
  const deckByCMC: DeckSlice = {}
  cards.forEach((card) => {
    const cmc = card.cmc

    if (typeof deckByCMC[cmc] === 'undefined') {
      deckByCMC[cmc] = []
    }

    deckByCMC[cmc].push(card)
  })

  return deckByCMC
}

export function sliceDeckByType(cards: Card[]): DeckSlice {
  const deckByType: DeckSlice = {}
  cards.forEach((card) => {
    const type = getCardType(card.type_line)

    if (typeof deckByType[type] === 'undefined') {
      deckByType[type] = []
    }

    deckByType[type].push(card)
  })

  return deckByType
}

export function sliceDeckByColor(cards: Card[]): DeckSlice {
  const deckByColor: DeckSlice = {}
  cards.forEach((card) => {
    const color = getCardColor(card.color_identity || [])

    if (typeof deckByColor[color] === 'undefined') {
      deckByColor[color] = []
    }

    deckByColor[color].push(card)
  })

  return deckByColor
}

export const layoutProportions = {
  cardSize: {
    width: 180,
    height: 250,
  },
  columnGap: 20,
  cardGap: 34,
  headingHeight: 60,
  gutter: 30,
}

export function layoutCards(deck: DeckSlice): Layout {
  const cards: LayoutCard[] = []
  const headings: LayoutHeading[] = []
  const columns = Object.entries(deck)
  let largestColumn = 0
  const width = getLayoutWidth(columns.length)

  columns.forEach((column, columnIndex) => {
    const x =
      columnIndex *
      (layoutProportions.cardSize.width + layoutProportions.columnGap)
    const columnName = column[0]
    const columnCards = column[1]
    headings.push({
      text: columnName,
      pos: {
        x: x + layoutProportions.gutter,
        y: layoutProportions.gutter,
        z: 1,
      },
      count: columnCards.length,
    })

    if (columnCards.length > largestColumn) {
      largestColumn = columnCards.length
    }

    columnCards.forEach((card, cardIndex) => {
      const y =
        layoutProportions.headingHeight + cardIndex * layoutProportions.cardGap
      const z = cardIndex + 1

      cards.push({
        card,
        pos: {
          x: x + layoutProportions.gutter,
          y: y + layoutProportions.gutter,
          z,
        },
      })
    })
  })

  const height = getLayoutHeight(largestColumn)

  return { cards, headings, board: { width, height } }
}

function getLayoutWidth(columns: number): number {
  const columnsWidths = columns * layoutProportions.cardSize.width
  const gaps = columns - 1
  const gapsWidths = gaps * layoutProportions.columnGap
  const gutters = layoutProportions.gutter * 2

  return columnsWidths + gapsWidths + gutters
}

function getLayoutHeight(cardCount: number): number {
  const stackedCards = cardCount - 1
  const stackedCardsHeight = stackedCards * layoutProportions.cardGap
  const gutters = layoutProportions.gutter * 2

  return (
    stackedCardsHeight +
    layoutProportions.cardSize.height +
    layoutProportions.headingHeight +
    gutters
  )
}
