export function sanitizeHandleInput(value: string): string {
  return value.replaceAll(/[^\w]/gi, '')
}
