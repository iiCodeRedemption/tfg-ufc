export const PROMOTIONS = {
  UFC: "UFC",
  ONE: "ONE",
  RIZIN: "RIZIN",
} as const

export type Promotion = (typeof PROMOTIONS)[keyof typeof PROMOTIONS]

export const PROMOTION_COLORS = {
  [PROMOTIONS.UFC]: "from-red-600 to-red-800",
  [PROMOTIONS.ONE]: "from-blue-600 to-blue-800",
  [PROMOTIONS.RIZIN]: "from-purple-600 to-purple-800",
} as const

export const PROMOTION_NAMES = {
  [PROMOTIONS.UFC]: "Ultimate Fighting Championship",
  [PROMOTIONS.ONE]: "ONE Championship",
  [PROMOTIONS.RIZIN]: "RIZIN Fighting Federation",
} as const
