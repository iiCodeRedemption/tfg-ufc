import { FighterStatus } from "@prisma/client"

export const STATUS_MAP: Record<FighterStatus, string> = {
  ACTIVE: "Active",
  RETIRED: "Retired",
  INACTIVE: "Inactive",
  CHAMPION: "Champion",
}
