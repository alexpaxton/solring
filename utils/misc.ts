import { Card } from 'scryfall-sdk'

export function pluralizer(
  string: string,
  count: number,
  includeCount?: boolean,
): string {
  const title = includeCount ? `${count} ${string}` : string
  return count === 1 ? title : `${title}s`
}

export function scryfallToData(cards: Card[]): string[] {
  return cards.map((card) => card.id)
}

export function classnames(
  base: string | undefined,
  names: Record<string, boolean>,
) {
  const list = base ? [base] : []
  const optionalNames = Object.entries(names)
  optionalNames.forEach(([key, included]) => included && list.push(key))
  return list.join(' ')
}
