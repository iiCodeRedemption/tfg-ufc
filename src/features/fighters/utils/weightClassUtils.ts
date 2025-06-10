import { FighterWithDetails } from "../data/types"
import {
  WEIGHT_CLASSES,
  WeightClassName,
} from "@/features/fighters/data/constants/weightClasses"
import { kgToPounds } from "@/features/fighters/utils/converters/weightConverter"

export function isInWeightClassRange(
  weightInLbs: number,
  weightClassValue: string,
) {
  const weightClass = WEIGHT_CLASSES.find((wc) => wc.value === weightClassValue)
  if (weightClass == null) return false

  const index = WEIGHT_CLASSES.findIndex((wc) => wc.value === weightClassValue)
  const prevWeightClass = index > 0 ? WEIGHT_CLASSES[index - 1] : null

  if (index === 0) {
    return weightInLbs <= parseFloat(weightClassValue)
  }

  if (prevWeightClass) {
    const minWeight = parseFloat(prevWeightClass.value)
    const maxWeight = parseFloat(weightClassValue)
    return weightInLbs > minWeight && weightInLbs <= maxWeight
  }

  return false
}

export function getWeightClassValue(weightInLbs: number) {
  for (let i = 0; i < WEIGHT_CLASSES.length; i++) {
    const currentValue = WEIGHT_CLASSES[i].value
    if (isInWeightClassRange(weightInLbs, currentValue)) {
      return currentValue
    }
  }

  return ""
}

export function filterByWeightClass(
  fighter: FighterWithDetails,
  selectedWeightClass: string,
) {
  if (selectedWeightClass == null || fighter.weight == null) return true

  const weightInLbs = kgToPounds(fighter.weight)

  const matchesWeightClass = WEIGHT_CLASSES.find(
    (wc) => wc.value === selectedWeightClass,
  )
  if (matchesWeightClass == null) return true

  return isInWeightClassRange(weightInLbs, matchesWeightClass.value)
}

export function getWeightClassName(weightInKg: number): WeightClassName {
  if (weightInKg <= 0) return "Flyweight"

  for (let i = 0; i < WEIGHT_CLASSES.length; i++) {
    if (weightInKg <= WEIGHT_CLASSES[i].maxKg) {
      return WEIGHT_CLASSES[i].name
    }
  }

  return "Heavyweight"
}

export function getWeightClassFromKg(weightInKg: number) {
  return getWeightClassValue(kgToPounds(weightInKg))
}
