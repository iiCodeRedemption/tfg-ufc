import { FightMethod } from "@prisma/client"

export function fightMethodToString(method: FightMethod) {
  switch (method) {
    case "KO_TKO":
      return "Knockout/TKO"
    case "SUBMISSION":
      return "Submission"
    case "DECISION":
      return "Decision"
    default:
      return method
  }
}
