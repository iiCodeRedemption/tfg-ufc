import { z } from "zod"

export const statisticsSchema = z.object({
  totalStrikes1: z.coerce.number().min(0),
  totalStrikes2: z.coerce.number().min(0),
  sigStrikes1: z.coerce.number().min(0),
  sigStrikes2: z.coerce.number().min(0),
  takedowns1: z.coerce.number().min(0),
  takedowns2: z.coerce.number().min(0),
  submissionAttempts1: z.coerce.number().min(0),
  submissionAttempts2: z.coerce.number().min(0),
  knockdowns1: z.coerce.number().min(0),
  knockdowns2: z.coerce.number().min(0),
  reversals1: z.coerce.number().min(0),
  reversals2: z.coerce.number().min(0),
})

export type StatisticsFormData = z.infer<typeof statisticsSchema>
