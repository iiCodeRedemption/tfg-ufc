import { FightType } from "@prisma/client"

export function FightTypeBadge({ fightType }: { fightType: FightType }) {
  function getFightTypeStyles() {
    switch (fightType) {
      case FightType.MAIN_EVENT:
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case FightType.CO_MAIN_EVENT:
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case FightType.PRELIMS:
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case FightType.EARLY_PRELIMS:
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  function getFightTypeLabel(type: FightType) {
    switch (type) {
      case FightType.MAIN_EVENT:
        return "Main Event"
      case FightType.CO_MAIN_EVENT:
        return "Co-Main"
      case FightType.PRELIMS:
        return "Prelim"
      case FightType.EARLY_PRELIMS:
        return "Early Prelim"
      default:
        return type
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getFightTypeStyles()}`}
    >
      {getFightTypeLabel(fightType)}
    </span>
  )
}
