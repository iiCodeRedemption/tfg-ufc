export function kgToPounds(weightInKg: number): number {
  return Math.round(weightInKg * 2.20462)
}

export function poundsToKg(weightInLbs: number): number {
  return Math.round((weightInLbs / 2.20462) * 10) / 10
}
