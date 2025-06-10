import { EventType } from "@prisma/client"

export function PromotionBadge({ promotion }: { promotion: EventType }) {
  function getPromotionStyles() {
    switch (promotion) {
      case "UFC":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "RIZIN":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "ONE":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPromotionStyles()}`}
    >
      {promotion}
    </span>
  )
}
