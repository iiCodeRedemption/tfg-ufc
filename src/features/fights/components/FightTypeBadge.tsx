import { FightType } from "@prisma/client"

export function FightTypeBadge({ fightType }: { fightType: FightType }) {
  function getFightTypeStyles() {
    switch (fightType) {
      case "MAIN_EVENT":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "CO_MAIN_EVENT":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "FEATURED_FIGHT":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "PRELIMS":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "EARLY_PRELIMS":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  function getFightTypeLabel(type: FightType) {
    switch (type) {
      case "MAIN_EVENT":
        return "Main Event"
      case "CO_MAIN_EVENT":
        return "Co-Main"
      case "FEATURED_FIGHT":
        return "Featured"
      case "PRELIMS":
        return "Prelim"
      case "EARLY_PRELIMS":
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
