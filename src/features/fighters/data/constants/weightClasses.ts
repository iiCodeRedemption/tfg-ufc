export const WEIGHT_CLASSES = [
  {
    value: "115",
    label: "Strawweight (115 lbs)",
    name: "Strawweight",
    maxKg: 52.2,
  },
  {
    value: "125",
    label: "Flyweight (125 lbs)",
    name: "Flyweight",
    maxKg: 56.7,
  },
  {
    value: "135",
    label: "Bantamweight (135 lbs)",
    name: "Bantamweight",
    maxKg: 61.2,
  },
  {
    value: "145",
    label: "Featherweight (145 lbs)",
    name: "Featherweight",
    maxKg: 65.8,
  },
  {
    value: "155",
    label: "Lightweight (155 lbs)",
    name: "Lightweight",
    maxKg: 70.3,
  },
  {
    value: "170",
    label: "Welterweight (170 lbs)",
    name: "Welterweight",
    maxKg: 77.1,
  },
  {
    value: "185",
    label: "Middleweight (185 lbs)",
    name: "Middleweight",
    maxKg: 83.9,
  },
  {
    value: "205",
    label: "Light Heavyweight (205 lbs)",
    name: "Light Heavyweight",
    maxKg: 93.0,
  },
  {
    value: "265",
    label: "Heavyweight (265 lbs)",
    name: "Heavyweight",
    maxKg: 120.2,
  },
] as const

export type WeightClass = (typeof WEIGHT_CLASSES)[number]["value"]
export type WeightClassName = (typeof WEIGHT_CLASSES)[number]["name"]
