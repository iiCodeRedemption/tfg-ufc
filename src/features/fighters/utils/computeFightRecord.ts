import { FightMethod, FightResult } from "@prisma/client"

export type FighterWithRecord = {
  id: string
  fightsAsFighter?: Array<{
    participants?: Array<{
      fighterId: string
      result: FightResult
    }>
  }>
  fightsAsOpponent?: Array<{
    participants?: Array<{
      fighterId: string
      result: FightResult
    }>
  }>
  fightParticipations?: Array<{
    result: FightResult
    fight: {
      id: string
      method: FightMethod
    }
  }>
}

export function computeFighterRecord(fighter: FighterWithRecord) {
  const record = { wins: 0, losses: 0, draws: 0 }

  if (fighter == null) return record

  if (fighter.fightParticipations && fighter.fightParticipations.length > 0) {
    fighter.fightParticipations.forEach((participation) => {
      if (participation.result === FightResult.WIN) {
        record.wins += 1
      } else if (participation.result === FightResult.LOSS) {
        record.losses += 1
      } else if (participation.result === FightResult.DRAW) {
        record.draws += 1
      }
    })

    if (record.wins > 0 || record.losses > 0 || record.draws > 0) {
      return {
        wins: record.wins,
        losses: record.losses,
        draws: record.draws,
        toString: () => `${record.wins}-${record.losses}-${record.draws}`,
      }
    }
  }

  const fightsAsFighter = fighter.fightsAsFighter || []
  const fightsAsOpponent = fighter.fightsAsOpponent || []

  const allFights = [...fightsAsFighter, ...fightsAsOpponent]

  allFights.forEach((fight) => {
    if (fight.participants == null) return

    const participant = fight.participants.find(
      (p) => p.fighterId === fighter.id
    )
    if (participant == null) return

    record.wins += participant.result === FightResult.WIN ? 1 : 0
    record.losses += participant.result === FightResult.LOSS ? 1 : 0
    record.draws += participant.result === FightResult.DRAW ? 1 : 0
  })

  return {
    wins: record.wins,
    losses: record.losses,
    draws: record.draws,
    toString: () => `${record.wins}-${record.losses}-${record.draws}`,
  }
}
