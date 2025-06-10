export const DEFAULT_INCLUDE = {
  fightsAsFighter: {
    include: {
      participants: {
        select: {
          result: true,
          fighterId: true,
        },
      },
      event: {
        select: { promotion: true },
      },
    },
  },
  fightsAsOpponent: {
    include: {
      participants: {
        select: {
          result: true,
          fighterId: true,
        },
      },
      event: {
        select: { promotion: true },
      },
    },
  },
  fightParticipations: {
    select: {
      result: true,
      fight: {
        select: {
          event: {
            select: { promotion: true },
          },
        },
      },
    },
  },
  ufcDetails: true,
  rizinDetails: true,
  oneDetails: true,
}
