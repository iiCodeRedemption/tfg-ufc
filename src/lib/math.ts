export function convertDollarsToCents(dollars: number) {
  return Math.round(dollars * 100)
}

export function convertCentsToDollars(cents: number) {
  return cents / 100
}
