export function pluralizer(string: string, count: number, includeCount?: boolean): string {
  const title = includeCount ? `${count} ${string}` : string
  return count === 1 ? title : `${title}s`
}